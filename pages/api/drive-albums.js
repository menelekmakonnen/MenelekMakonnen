import {
  AI_ALBUMS_DRIVE_FOLDER,
  PHOTOGRAPHY_DRIVE_FOLDER,
  getDriveFullImageUrl,
  getDriveImageUrl
} from '@/lib/data/googleDrive';

const DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder';

async function fetchDriveFiles(folderId, { mimeType } = {}) {
  if (!DRIVE_API_KEY) {
    throw new Error('GOOGLE_DRIVE_API_KEY is required to load Google Drive albums.');
  }

  const files = [];
  let pageToken;

  do {
    const queryParts = [
      `'${folderId}' in parents`,
      'trashed=false'
    ];

    if (mimeType) {
      queryParts.push(`mimeType='${mimeType}'`);
    }

    const query = encodeURIComponent(queryParts.join(' and '));
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,modifiedTime,thumbnailLink)&pageSize=1000&key=${DRIVE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Failed to read Google Drive contents');
    }

    const data = await response.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

async function buildAlbumFromFolder(folder, category) {
  const images = (await fetchDriveFiles(folder.id)).filter((file) => file.mimeType?.startsWith('image/'));
  if (!images.length) return null;

  return {
    id: folder.id,
    name: folder.name,
    category,
    date: folder.modifiedTime?.slice(0, 10) || '',
    thumbnail: getDriveImageUrl(images[0].id) || images[0].thumbnailLink,
    images: images.map((image) => ({
      id: image.id,
      title: image.name,
      url: getDriveImageUrl(image.id) || image.thumbnailLink,
      fullUrl: getDriveFullImageUrl(image.id)
    }))
  };
}

async function buildPhotographyAlbums() {
  const topLevel = await fetchDriveFiles(PHOTOGRAPHY_DRIVE_FOLDER, { mimeType: FOLDER_MIME_TYPE });
  const categories = topLevel.filter((folder) => ['Beauty', 'Professional'].includes(folder.name));

  const albums = [];
  for (const category of categories) {
    const galleries = await fetchDriveFiles(category.id, { mimeType: FOLDER_MIME_TYPE });
    for (const gallery of galleries) {
      const album = await buildAlbumFromFolder(gallery, category.name);
      if (album) albums.push(album);
    }
  }

  return albums;
}

async function buildAIAlbums() {
  const topLevel = await fetchDriveFiles(AI_ALBUMS_DRIVE_FOLDER, { mimeType: FOLDER_MIME_TYPE });
  const aiFolders = topLevel.filter((folder) => !['Beauty', 'Professional'].includes(folder.name));

  const albums = [];
  for (const folder of aiFolders) {
    const album = await buildAlbumFromFolder(folder);
    if (album) albums.push(album);
  }

  return albums;
}

export default async function handler(req, res) {
  try {
    const { type } = req.query;

    if (!type || !['ai', 'photography'].includes(type)) {
      return res.status(400).send('Album type must be "ai" or "photography".');
    }

    const albums = type === 'ai' ? await buildAIAlbums() : await buildPhotographyAlbums();

    return res.status(200).json({ albums });
  } catch (error) {
    return res.status(500).send(error.message || 'Failed to load albums');
  }
}
