'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  ChevronsUpDown,
  User,
  CalendarArrowUp,
  FileQuestion,
  FolderDot,
  Users,
  Trophy,
} from 'lucide-react';

export type AllCandidates = {
  id: string;
  name: string;
  year: number;
  projectStatus: boolean;
  aptitudeStatus: boolean;
  shortlistStatus: boolean;
  interviewStatus: boolean;
};

export const columns: ColumnDef<AllCandidates>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex cursor-pointer items-center gap-[1px] font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <User className="mr-1 size-4 stroke-[2]" />
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </h2>
      );
    },
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <CalendarArrowUp className="mr-1 size-4 stroke-[2]" />
          Year
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
  },
  {
    accessorKey: 'aptitudeStatus',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <FileQuestion className="mr-1 size-4 stroke-[2]" />
          Aptitude Status
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`rounded-2xl py-2 text-center text-xs font-medium ${
            row.getValue('aptitudeStatus')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.getValue('aptitudeStatus') ? 'Completed' : 'Pending'}
        </div>
      );
    },
  },
  {
    accessorKey: 'projectStatus',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <FolderDot className="size-4 stroke-[2]" />
          Project
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`rounded-2xl py-2 text-center text-xs font-medium ${
            row.getValue('projectStatus')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.getValue('projectStatus') ? 'Submitted' : 'Not Submitted'}
        </div>
      );
    },
  },
  {
    accessorKey: 'shortlistStatus',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <Trophy className="size-4 stroke-[2]" />
          Shortlisted
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`rounded-2xl py-2 text-center text-xs font-medium ${
            row.getValue('shortlistStatus')
              ? 'bg-green-100 text-green-700'
              : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          {row.getValue('shortlistStatus') ? 'Shortlisted' : 'Not Shortlisted'}
        </div>
      );
    },
  },
  {
    accessorKey: 'interviewStatus',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <Users className="size-4 stroke-[2]" />
          Interview
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`rounded-2xl py-2 text-center text-xs font-medium ${
            row.getValue('interviewStatus')
              ? 'bg-green-100 text-green-700'
              : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          {row.getValue('interviewStatus') ? 'Completed' : 'Not Attempted'}
        </div>
      );
    },
  },
];
