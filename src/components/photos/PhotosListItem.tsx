import { GoTrash } from 'react-icons/go';
import { useRemovePhotoMutation } from '@/store';

import { Photo } from '@/types/photo';

type PhotoListItemProps = {
    photo: Photo;
};

export default function PhotosListItem({ photo }: PhotoListItemProps) {
    const [removePhoto] = useRemovePhotoMutation();

    function handleRemovePhoto() {
        removePhoto(photo);
    }

    return (
        <div
            className='relative m-2 cursor-pointer'
            onClick={handleRemovePhoto}
        >
            <img className='h-20 w-20' src={photo.url} alt='random pic' />
            <div className='absolute inset-0 z-10 flex items-center justify-center opacity-0 duration-200 hover:bg-gray-200 hover:opacity-80'>
                <GoTrash className='text-3xl text-[#39393a]' />
            </div>
        </div>
    );
}
