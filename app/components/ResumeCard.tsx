import React from 'react';
import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';

// @ts-ignore
function ResumeCard({ resume }: ResumeCardProps) {
    const { id, companyName, jobTitle, feedback, imagePath } = resume;

    return (
        <Link
            to={`/resume/${id}`}
            className="resume-card animate-in fade-in duration-1000 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View resume for ${companyName} - ${jobTitle}`}
        >
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    <h2 className="text-black font-bold break-words">{companyName}</h2>
                    <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback?.overallScore ?? 0} />
                </div>
            </div>

            <div className="animate-in fade-in duration-1000 overflow-hidden rounded-md">
                <div className="h-full w-full ">
                    <img
                        src={imagePath}
                        alt={`${companyName} resume`}
                        className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        onError={(e) => {
                            e.currentTarget.src = '/default-image.jpg';
                        }}
                    />
                </div>
            </div>
        </Link>
    );
}

export default ResumeCard;