import NavBar from "@/elements/NavBar";
import { Input } from "@/components/ui/input";

const Profile = () => {
  return (
    <>
      <NavBar />
      <div className="mx-44">
        <h3 className="mb-8 max-w-48 scroll-m-20 text-2xl font-semibold tracking-tight">
          Profile
        </h3>

        <div className="max-w-xl">
          <div className="my-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="...">
                <p className="leading-7 [&:not(:first-child)]:mt-6"> Name </p>
              </div>
              <div className="col-span-2 ">
                <Input />
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="...">
                <p className="leading-7 [&:not(:first-child)]:mt-6"> Email </p>
              </div>
              <div className="col-span-2 ">
                <Input />
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="...">
                <p className="leading-7 [&:not(:first-child)]:mt-6">Password</p>
              </div>
              <div className="col-span-2 ">
                <Input />
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Profile;
