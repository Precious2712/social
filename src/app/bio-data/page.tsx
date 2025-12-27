'use client';

import { AddMoreInformation } from "@/components/AddBioData/AddMoreInformation";
import { Nav } from "@/components/NavBar/Nav";


export default function AddMoreBioDataInfo() {
    return (
        <div>
            <Nav/>
  
            <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-22 min-h-screen">
                <div className="mt-5">
                    <AddMoreInformation />
                </div>
            </div>
        </div>
    )
}