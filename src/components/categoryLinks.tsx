import React from "react";
import { IconBriefcase, IconBulb, IconSchool, IconWriting, IconMoodSmile, IconHeart, } from "@tabler/icons-react";
import { label } from "motion/react-client";

const categories = [
    { icon: IconBriefcase, label: "Business" },
    { icon: IconSchool, label: "Education" },
    { icon: IconBulb, label: "Creative" },
    { icon: IconHeart, label: "Health" },
    { icon: IconWriting, label: "Journaling" },
    { icon: IconMoodSmile, label: "Communication" },
]

const CategoryLinks: React.FC = () => {
    return (
        <div className="mt-10 sm:mt-20">
            {categories.map(({icon:Icon, label}) => (
                <div key={label} 
                    className="
                    m-1 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg
                    border border-gray-200  shadow-sm hover:bg-gray-50
                    disabled:opacity-50 disabled:pointer-events-auto bg-neutral-900 text-white
                    "
                >
                    <Icon size={40} />
                    <p className="text-2xl">{label}</p>
                </div>
            ))}
        </div>
    )
}

export default CategoryLinks;