import GenericForm from "../genericForm/genericForm";

function EditProfile({ userType, id, userData }) {
  console.log(userType, id, userData);
  return (
    <div>
      <GenericForm type={userType} id={id} data={userData} />
    </div>
  );
}
export default EditProfile;
