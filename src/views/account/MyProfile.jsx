import React, { lazy,useContext, Component } from "react";
import { globalC } from "../../Context";
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() =>
  import("../../components/account/CardListForm")
);

const MyProfileView = () => {

   const { authLogin,token,authLoginDetail } = useContext(globalC);


  // state = { imagePreview: "", isDeleting: false };

 const onSubmitProfile = async (values) => {
    alert(JSON.stringify(values));
  };

  const onSubmitChangePassword = async (values) => {
    alert(JSON.stringify(values));
  };

 const onImageChange = async (obj) => {
    if (obj) {
      const val = await this.getBase64(obj);
      this.setState({ imagePreview: val });
    } else {
      this.setState({ imagePreview: "" });
    }
  };

 const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };
  
    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <ProfileForm
              onSubmit={onSubmitProfile}
              onImageChange={onImageChange}
            />
          </div>
          <div className="col-md-8">
            {/* <ChangePasswordForm onSubmit={onSubmitChangePassword} /> */}
            <br></br>
            <SettingForm />
            <br></br>
            {/* <CardListForm /> */}
          </div>
        </div>
      </div>
    );
  
}

export default MyProfileView;
