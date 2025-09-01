import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import * as LucideIcons from "lucide-react";

import { FormatDate } from "../formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }


  return (

    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>


        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredData.length > 0 ? (
              filteredData.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                      {paste?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                      // onClick={() => toast.error("Not working")}
                      >
                        <Link to={`/?pasteId=${paste?._id}`}>
                          <LucideIcons.PencilLine className="text-black group-hover:text-blue-500"
                            size={20} />


                        </Link>
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <LucideIcons.Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        <Link to={`/pastes/${paste?._id}`} >
                          <LucideIcons.Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </Link>
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <LucideIcons.Copy size={20} className="text-black group-hover:text-green-500" />

                      </button>

                      {/* Share Button */}
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500"
                        onClick={() => {
                          const shareData = {
                            title: paste?.title || "My Paste",
                            text: paste?.content?.substring(0, 100) + "...",
                            url: window.location.href + `?pasteId=${paste?._id}`,
                          };

                          if (navigator.share) {
                            navigator.share(shareData).catch(() => {
                              toast.error("Could not share");
                            });
                          } else {
                            navigator.clipboard.writeText(shareData.url);
                            toast.success("Link copied to clipboard (Share not supported)");
                          }
                        }}
                      >
                        <LucideIcons.Share2
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        />
                      </button>


                    </div>

                    <div className="gap-x-2 flex ">
                      <LucideIcons.Calendar className="text-black" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
