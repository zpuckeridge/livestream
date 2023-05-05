"use client";

import { format } from "date-fns";
import PublishEdit from "./PublishEdit";

interface Video {
  asset_id: string;
  title: string;
  description: string;
  tag: string;
  public: boolean;
  date: Date;
}

interface Props {
  videos: Video[];
}

export default function Edit({ videos }: Props) {
  return (
    <table className="table-auto w-full">
      <thead>
        <th>Name</th>
        <th className="hidden md:table-cell">Date</th>
        <th className="hidden md:table-cell">Tag</th>
        <th className="hidden md:table-cell">Visibility</th>
        <th></th>
      </thead>
      <tbody>
        {videos.map((video) => (
          <tr className="even:bg-muted" key={video.asset_id}>
            <td className="w-80">{video.title}</td>
            <td className="w-80 text-center hidden md:table-cell">
              {format(video.date, "P")}
            </td>
            <td className="w-80 text-center hidden md:table-cell">
              {video.tag}
            </td>
            <td className="w-80 text-center hidden md:table-cell">
              {video.public ? "Public" : "Private"}
            </td>
            <td className="text-right">
              <PublishEdit
                key={video.asset_id}
                asset_id={video.asset_id}
                title={video.title}
                description={video.description}
                tag={video.tag}
                visibility={video.public}
                date={video.date}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
