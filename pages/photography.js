import Link from 'next/link';

export async function getServerSideProps({ req }) {
  const folderId = '1G_6TgOtftLKwqRWjH-tFLuCgp_Oydor4';
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const res = await fetch(`${protocol}://${host}/api/list-drive-folder?id=${folderId}`);
  const data = await res.json();
  // Filter to only include Beauty and Professional subfolders
  const items = (data.items || []).filter(
    (item) => item.type === 'folder' && (item.name === 'Beauty' || item.name === 'Professional')
  );
  return {
    props: {
      items,
    },
  };
}

export default function Photography({ items }) {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Photography Albums</h1>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/gallery/${item.id}`} className="text-blue-500 underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
