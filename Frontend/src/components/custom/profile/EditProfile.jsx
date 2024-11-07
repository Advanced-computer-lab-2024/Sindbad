import DeleteForm from "../deleteForm";
import GenericForm from "../genericForm/genericForm";

function EditProfile({ userType, id, userData }) {
  console.log(userType, id, userData);
  return (
    <div>
      <GenericForm type={userType} id={id} data={userData} />

      <h1 className="text-2xl font-semibold my-4">Danger Area</h1>
      <DeleteForm type={userType}/>
    </div>
  );
}
export default EditProfile;
