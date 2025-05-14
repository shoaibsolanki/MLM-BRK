import { useEffect, useState, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DataService from "../../services/requestApi";
import { useAuth } from "../../contexts/AuthConext";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { Refresh } from "@mui/icons-material";

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  mobile_number: yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup.string().required('Date of birth is required'),
  referId: yup.string().when('$isSelfReferral', ([isSelfReferral], schema) => 
    isSelfReferral ? schema.required('Sponsor ID is required') : schema
  ),
  acceptTerms: yup.boolean()
    .oneOf([true], 'You must accept the terms')
    .required(),
  isOver18: yup.boolean()
    .oneOf([true], 'You must accept')
    .required(),
  captchaInput: yup.string()
    .test('captcha', 'Invalid captcha', (value, context) => 
      value === context.options.context.captchaValue
    )
    .required('Captcha is required'),
}).required();

const CustomerRegistration = () => {
  const { organization, referralCode } = useParams();
  const { saasid, storeid } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // const captchaValue = useMemo(() => "360964", []);
  const isSelfReferral = referralCode === "self";

    const generateCaptcha = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaValue(captcha);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    context: {
      isSelfReferral,
      captchaValue
    },
    defaultValues: {
      saas_id: saasid,
      store_id: storeid,
      direction: organization,
      referId: isSelfReferral ? "" : referralCode,
      acceptTerms: false,
      captchaInput: "",
      sponsorName: "",
    }
  });

  // Memoize the sponsor name fetching function
    useEffect(() => {
  
      const fetchSponsorName = async () => {
        try {
          // if (referralCode !== "self") {
            
         
          const response = await DataService.getReferName(referralCode !== "self" ?referralCode:watch('referId'));
          if (response.data) {
            setValue('sponsorName' , response.data.data)
            
          } else {
            setValue('sponsorName' , '')
          } 
        // }
        } catch (error) {
          enqueueSnackbar("Failed to fetch sponsor name", { variant: "error" });
          setFormData((prev) => ({
            ...prev,
            sponsorName: "",
          }));
        }
      };

      fetchSponsorName();
       generateCaptcha()
  }, [referralCode ,watch('referId')]); 

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await DataService.createCustomer(data);
      if (response.data.status) {
        enqueueSnackbar("Customer created successfully!", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to register", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Customer Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">BRK Sponsor ID</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">BRK</span>
              <input
                className={`pl-12 w-full p-2 border rounded ${
                  !isSelfReferral ? "bg-gray-200" : ""
                } ${errors.referId ? "border-red-500" : ""}`}
                {...register("referId")}
                disabled={!isSelfReferral}
              />
              {errors.referId && (
                <p className="text-red-500 text-sm mt-1">{errors.referId.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1">Sponsor Name</label>
            <input
              className="w-full p-2 border rounded bg-gray-100"
              {...register("sponsorName")}
              readOnly
            />
          </div>

          <div>
            <label className="block mb-1">Organization</label>
            <select
              className={`w-full p-2 border rounded ${
                !isSelfReferral ? "bg-gray-200" : ""
              }`}
              value={organization}
              {...register("direction")}
              disabled={!isSelfReferral}
            >
              <option value="org1">Organization 1</option>
              <option value="org2">Organization 2</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Full Name</label>
            <input className="w-full p-2 border rounded" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            <select className="w-full p-2 border rounded" {...register("gender")}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input className="w-full p-2 border rounded" type="date" {...register("dob")} />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Mobile Number</label>
            <input type="tel" className="w-full p-2 border rounded" {...register("mobile_number")} />
            {errors.mobile_number && <p className="text-red-500 text-sm">{errors.mobile_number.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input type="email" className="w-full p-2 border rounded" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Confirm Password</label>
            <input type="password" className="w-full p-2 border rounded" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Captcha</label>
            <input type="text" className="w-full p-2 border rounded" {...register("captchaInput")} />
            {errors.captchaInput && <p className="text-red-500 text-sm">{errors.captchaInput.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Enter Captcha</label>
            <div className="flex items-center space-x-2">
              <div
                className="select-none px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-300 border border-blue-400 rounded-lg text-2xl font-mono tracking-widest text-blue-700 shadow-inner"
                style={{
                  letterSpacing: "0.3em",
                  userSelect: "none",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  textShadow: "1px 1px 2px #b3c6e7, 0 0 1px #fff"
                }}
              >
                {captchaValue}
              </div>
              <button
                type="button"
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                onClick={generateCaptcha}
                title="Refresh Captcha"
              >
                <Refresh/>
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="isOver18"
              name="isOver18"
              {...register("isOver18")}
              // checked={formData.isOver18}
              // onChange={handleChange}
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isOver18" className="ml-2 block text-sm text-gray-700">
              Yes I am 18 Years & above
            </label>
            {errors.isOver18 && <p className="text-red-500 text-sm">{errors.isOver18.message}</p>}
          </div>
      </div>
        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" {...register("acceptTerms")} />
          <label>I agree to the Terms and Conditions</label>
          {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default CustomerRegistration;
