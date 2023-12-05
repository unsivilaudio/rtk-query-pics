import type { Album } from '@/types/album';
import ExpandablePanel from '@/components/ui/ExpandablePanel';
import Button from '@/components/ui/Button';
import { GoTrash } from 'react-icons/go';
import { useRemoveAlbumMutation } from '@/store';
import PhotosList from '@/components/photos/PhotosList';

type AlbumItemProps = {
    album: Album;
};

export default function AlbumsListItem({ album }: AlbumItemProps) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    function handleRemoveAlbum() {
        removeAlbum(album);
    }

    const header = (
        <div className='flex items-center gap-2'>
            <Button onClick={handleRemoveAlbum} loading={results.isLoading}>
                <GoTrash />
            </Button>
            {album.title}
        </div>
    );
    return (
        <ExpandablePanel header={header} key={album.id}>
            <PhotosList album={album} />
        </ExpandablePanel>
    );
}
