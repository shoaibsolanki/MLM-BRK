import { useState, useEffect } from "react";
import { Check, Copy, Facebook, Instagram, Share2, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthConext";
import DataService from "../../services/requestApi"; // Import DataService
import { useSnackbar } from "notistack"; // Import Notistack

const ReferralModal = ({ onClose }) => {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { authData } = useAuth();
  const { id } = authData || {};
  const { enqueueSnackbar } = useSnackbar(); // Notistack for alerts
  const [organization, setOrganization] = useState("organization1"); // Default organization

  const fetchReferralCode = async () => {
    try {
      const response = await DataService.getRefercode(id);

      if (response.status && response.data) {
        setReferralCode(response.data.data.customerId); // Ensure extracting only the referral code
      } else {
        console.error("Invalid response format:", response);
        setReferralCode("N/A"); // Fallback
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
      setReferralCode("Error");
    }
  };

  useEffect(() => {
    if (id) {
      fetchReferralCode();
    }
  }, [id]);

  const copyToClipboard = () => {
    const referralUrl = `${window.location.origin}/customer-registration/${organization}/${referralCode}`;

    navigator.clipboard
      .writeText(referralUrl)
      .then(() => {
        setCopied(true);
        enqueueSnackbar("Referral link copied to clipboard!", { variant: "success" });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        enqueueSnackbar("Failed to copy referral link", { variant: "error" });
      });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Share Your Referral Code</h2>

        {/* Organization Selection Dropdown */}
        <select
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        >
          <option value="org1">Organization 1</option>
          <option value="org2">Organization 2</option>
        </select>

        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between mb-6">
          <span className="font-mono text-lg font-medium">{referralCode || "Loading..."}</span>
          <button
            onClick={copyToClipboard}
            className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-colors"
            aria-label="Copy referral code"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          Share this code with friends and you'll both get rewards when they join!
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=Join using my referral code: ${referralCode}`,
                "_blank"
              )
            }
            className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 text-green-600 rounded-lg p-4 transition duration-200"
          >
            <Share2 size={24} />
            <span className="mt-2 text-sm font-medium">WhatsApp</span>
          </button>

          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=Join using my referral code: ${referralCode}`,
                "_blank"
              )
            }
            className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg p-4 transition duration-200"
          >
            <Facebook size={24} />
            <span className="mt-2 text-sm font-medium">Facebook</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`Join using my referral code: ${referralCode}`);
              alert("Referral code copied! Open Instagram to share.");
            }}
            className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg p-4 transition duration-200"
          >
            <Instagram size={24} />
            <span className="mt-2 text-sm font-medium">Instagram</span>
          </button>
        </div>

        <button
          onClick={() => {
            navigator
              .share({
                title: "Join with my referral code",
                text: `Join using my referral code: ${referralCode}`,
                url: `${window.location.origin}/customer-registration/${organization}/refercode`,
              })
              .catch((err) => {
                console.log("Error sharing:", err);
              });
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
        >
          Share via other apps
        </button>
      </div>
    </div>
  );
};

export default ReferralModal;
