import React, { useEffect, useState } from "react";
import { Form, FormGroup } from "reactstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "../../Validations/ProfileSchema";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import countryCodes from "../../constants/CountryCodes.json";
import FormInput from "../UI/FormInput";
import axios from "axios";
import debounce from "lodash.debounce";

const ProfileForm = ({ image }) => {
  const { user } = useSelector((state) => state.auth);
  const [country, setCountry] = useState(user?.country || "");
  const [checkUsernameFeedback, setCheckUsernameFeedback] = useState({
    status: "",
    message: "",
  });

  const { updateProfile } = useUpdateProfile();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("profilePicture", image);

    await updateProfile(formData);
  };

  const handleCheckUsernameAvailability = debounce(async (username) => {
    const isValid = await trigger("username");

    try {
      if (isValid) {
        const { data } = await axios.get(
          `user/check-username?username=${username}`
        );

        if (data.available) {
          setCheckUsernameFeedback({
            status: "success",
            message: "Username is available!",
          });
        } else {
          setCheckUsernameFeedback({
            status: "error",
            message: "Username is already taken.",
          });
        }
      }
    } catch (error) {
      setCheckUsernameFeedback({
        status: "error",
        message: "Could not check username. Try again later.",
      });
    }
  }, 500);

  useEffect(() => {
    setValue("id", user._id);
    setValue("email", user.email);
    setValue("phoneNumber", user?.phoneNumber);
    setValue("city", user?.city);
    setValue("bio", user?.bio);
    setValue("username", user?.username);
  }, [user, setValue]);

  // Watch username changes
  const usernameValue = watch("username");

  // Effect to check username availability when input changes
  useEffect(() => {
    if (user.username !== usernameValue && usernameValue)
      handleCheckUsernameAvailability(usernameValue);
    else
      setCheckUsernameFeedback({
        status: "",
        message: "",
      });
  }, [usernameValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register("id")}
        label="Your Id:"
        error={errors.id?.message}
        disabled={true}
      />

      <FormInput
        register={register("username")}
        placeholder={"Enter your username"}
        label="Username:"
        error={errors.username?.message}
      />

      {checkUsernameFeedback.status === "success" ? (
        <p
          className="text-success fw-bold mx-1 "
          style={{ fontSize: "0.8rem" }}
        >
          {checkUsernameFeedback.message}
        </p>
      ) : (
        <p className="text-danger fw-bold mx-1 " style={{ fontSize: "0.8rem" }}>
          {checkUsernameFeedback.message}
        </p>
      )}

      <FormInput
        register={register("bio")}
        label="Bio:"
        placeholder="bio"
        error={errors.bio?.message}
      />

      <FormInput
        register={register("email")}
        label="Email Address:"
        error={errors.email?.message}
        disabled={true}
      />

      <h6 className="mb-1 ms-1 text-danger">Phone Number:</h6>
      {/* Add Contery code  */}
      <div className="d-flex gap-1 ">
        <FormGroup className="w-25">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className=" w-100 form-control "
          >
            <option value="">Select Contery Code</option>
            {countryCodes.map((c) => (
              <option value={c.code} key={c.code + c.dial_code}>
                {c.name} ({c.dial_code})
              </option>
            ))}
          </select>
        </FormGroup>

        <FormInput
          register={register("phoneNumber")}
          error={errors.phoneNumber?.message}
          placeholder="Phone number"
          className="w-75"
        />
      </div>

      <FormInput
        register={register("city")}
        label="City:"
        placeholder="City"
        error={errors.city?.message}
      />

      <Button type="submit"> Update Profile</Button>

      <p className="mt-2 px-2 ">
        We Get Your City and phone number code from your IP. Feel free to update
        them if you using VPN
      </p>
    </Form>
  );
};

export default ProfileForm;
