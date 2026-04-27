import { FaCircleUser } from 'react-icons/fa6';

const AppDefaultUser = () => {
  return (
    <section className="w-12 h-12 bg-muted group-hover:bg-muted-foreground/15 flex justify-center items-center">
      <FaCircleUser className="size-6 text-muted-foreground/35" />
    </section>
  );
};
export default AppDefaultUser;
