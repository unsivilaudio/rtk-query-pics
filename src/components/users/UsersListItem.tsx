import { GoTrash } from 'react-icons/go';

import { useThunk } from '@/hooks/use-thunk';
import { removeUser } from '@/store';

import { User } from '@/types/user';

import Button from '@/components/ui/Button';
import ExpandablePanel from '@/components/ui/ExpandablePanel';
import AlbumsList from '@/components/albums/AlbumsList';

type UserListItemProps = {
    user: User;
};

function UsersListItem({ user }: UserListItemProps) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = (
        <>
            <Button className='mr-3' loading={isLoading} onClick={handleClick}>
                <GoTrash />
            </Button>
            {error && <div>Error deleting user.</div>}
            {user.name}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;
