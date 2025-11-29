import { useEffect, useState } from 'react';

export function useDriveAlbums(type) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAlbums() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/drive-albums?type=${type}`);
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || 'Unable to load albums');
        }

        const data = await response.json();
        if (isMounted) {
          setAlbums(data.albums || []);
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load albums');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAlbums();

    return () => {
      isMounted = false;
    };
  }, [type]);

  return { albums, loading, error };
}

export default useDriveAlbums;
