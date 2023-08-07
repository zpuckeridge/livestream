"use client";

import { ColumnDef } from "@tanstack/react-table";

import PublishEdit from "@/components/dashboard/publish-edit";

export type Videos = {
  asset_id: string;
  title: string;
  date: Date;
  description: string;
  tag: string;
  public: boolean;
};

export const columns: ColumnDef<Videos>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "public",
    header: "Visibility",
    cell: ({ row }) => (row ? "Public" : "Private"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const video = row.original;

      return (
        <PublishEdit
          key={video.asset_id}
          asset_id={video.asset_id}
          title={video.title}
          description={video.description}
          tag={video.tag}
          visibility={video.public}
          date={video.date}
        />
      );
    },
  },
];
