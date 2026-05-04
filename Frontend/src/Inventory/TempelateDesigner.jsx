
import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import {
  MessageSquare,
  Clock3,
  CheckSquare,
  ShieldCheck,
  Settings,
  Plus,
} from "lucide-react";

function TempelateDesigner() {
  const [activeTab, setActiveTab] = useState("whatsapp");

  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [whatsappText, setWhatsappText] = useState(`Hi *{retailer_name}*,

We regret to inform you that your order *#{order_id}* is experiencing a delay.

Our logistics team is working to resolve this. Your new estimated delivery time is *{new_eta}*.

We apologize for the inconvenience.`);

  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setEmailBody(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div className="min-h-screen bg-[#F3F5F4]">

     

      {/* MAIN GRID */}
      <div className="grid grid-cols-[340px_1fr_320px] min-h-[calc(100vh-80px)]">

        {/* LEFT PANEL */}
        <div className="bg-[#F7F8F7] border-r p-6 overflow-y-auto">

          <h2 className="text-3xl font-bold mb-8">Message Template</h2>

          {/* CATEGORY */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              TEMPLATE CATEGORY
            </p>

            <select className="w-full border rounded-xl px-4 py-3 bg-[#EEF1EE] outline-none">
              <option>Delivery Delay Alert</option>
              <option>Order Confirmation</option>
              <option>Invoice Sent</option>
            </select>
          </div>

          {/* CONTENT EDITOR */}
          <div className="mb-6">
            <div className="flex justify-between mb-2 items-center">
              <p className="text-sm text-gray-500 font-medium">
                CONTENT EDITOR
              </p>

              <button className="text-green-600 text-sm font-medium flex items-center gap-1">
                <Plus size={14} /> Add Variable
              </button>
            </div>

            <textarea
              value={whatsappText}
              onChange={(e) => setWhatsappText(e.target.value)}
              rows={12}
              className="w-full rounded-xl border bg-[#EEF1EE] p-4 outline-none resize-none text-sm leading-7"
            />
          </div>

          {/* BUTTONS */}
          <div>
            <p className="text-sm text-gray-500 mb-3 font-medium">
              INTERACTIVE BUTTONS
            </p>

            <div className="space-y-3">

              <div className="border border-dashed border-green-500 rounded-xl px-4 py-4 flex justify-between items-center bg-[#F7FBF7]">
                <span>Track Order</span>
                <Settings size={16} className="text-gray-500" />
              </div>

              <div className="border border-dashed border-green-500 rounded-xl px-4 py-4 flex justify-between items-center bg-[#F7FBF7]">
                <span>Contact Support</span>
                <Settings size={16} className="text-gray-500" />
              </div>

              <button className="w-full border border-dashed rounded-xl py-4 text-gray-500 hover:bg-gray-100">
                + Add Button
              </button>
            </div>
          </div>

          <div className="mt-12 text-sm text-green-700">
            Use *text* for bold in WhatsApp
          </div>
        </div>

        {/* CENTER PREVIEW */}
        <div className="flex justify-center items-center p-8 bg-[#EEF1EE] relative">

          <div className="absolute top-10 bg-green-500 text-white rounded-full px-6 py-2 text-sm font-medium shadow">
            Verified Template Preview
          </div>

          <div className="w-340px h-690px rounded-[50px] bg-black shadow-2xl p-4">

            <div className="bg-[#0D6E63] h-full rounded-[40px] overflow-hidden relative">

              {/* CHAT HEADER */}
              <div className="flex items-center gap-3 px-5 py-5 text-white bg-[#0B5E54]">
                <div className="text-2xl">←</div>

                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#0B5E54] font-bold">
                  S
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    SmartPharm Wholesaler
                  </h3>
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="p-5 pt-8">
                <div className="bg-white rounded-2xl p-4 shadow max-w-[90%] text-sm leading-7 whitespace-pre-line">
                  {whatsappText}
                </div>

                <div className="mt-4 space-y-2">
                  <button className="bg-white w-full rounded-xl py-3 border text-sm font-medium hover:bg-gray-50">
                    Track Order
                  </button>

                  <button className="bg-white w-full rounded-xl py-3 border text-sm font-medium hover:bg-gray-50">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#F7F8F7] border-l p-6">

          <h2 className="text-3xl font-bold mb-8">Trigger Settings</h2>

          {/* AUTO RULE */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-gray-500">
                AUTO-SEND RULE
              </p>

              <div className="w-12 h-7 rounded-full bg-green-500 relative">
                <div className="absolute right-1 top-1 bg-white w-5 h-5 rounded-full"></div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Send this template automatically based on delay data.
            </p>

            <div className="bg-[#EEF1EE] rounded-2xl p-5">
              <p className="text-sm mb-3">Delay Threshold</p>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  defaultValue={30}
                  className="w-24 rounded-lg border p-3 bg-white"
                />
                <span className="text-gray-600">minutes</span>
              </div>
            </div>
          </div>

          {/* RECIPIENTS */}
          <div className="mb-8 border-t pt-8">
            <p className="text-sm font-medium text-gray-500 mb-5">
              RECIPIENTS
            </p>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked readOnly />
                <span>Primary Retail Contact</span>
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" />
                <span>Store Manager</span>
              </label>
            </div>
          </div>

          {/* APPROVAL */}
          <div className="border-t pt-8">
            <p className="text-sm font-medium text-gray-500 mb-4">
              APPROVAL WORKFLOW
            </p>

            <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 flex gap-3 items-start">
              <ShieldCheck className="text-yellow-600 mt-1" size={18} />

              <p className="text-sm text-yellow-700">
                This template requires <strong>Logistics Head</strong> approval before going live.
              </p>
            </div>
          </div>

          <button className="w-full mt-12 bg-gray-100 py-4 rounded-xl font-semibold hover:bg-gray-200">
            Send Test Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default TempelateDesigner;



