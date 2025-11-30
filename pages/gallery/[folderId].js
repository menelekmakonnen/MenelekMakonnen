import Link from 'next/link';

export async function getServerSideProps({ params, req }) {
  const { folderId } = params;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const res = await fetch(`${protocol}://${host}/api/list-drive-folder?id=${folderId}`);
  const data = await res.json();
  return {
    props: {
      items: data.items || [],
      folderId,
    },
  };
}

export default function GalleryPage({ items, folderId }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) =>
          item.type === 'folder' ? (
            <li key={item.id}>
              <Link href={`/gallery/${item.id}`} className="block p-4 border rounded hover:bg-gray-100">
                {item.name || item.id}
              </Link>
            </li>
          ) : (
            <li key={item.id}>
              <img
                src={`https://drive.google.com/uc?export=view&id=${item.id}`}
                alt={item.name || ''}
                className="w-full h-auto"
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
