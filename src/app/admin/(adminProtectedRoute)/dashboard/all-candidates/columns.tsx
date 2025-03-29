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
  year: string;
  projectStatus: 'Submitted' | 'Not Submitted';
  quizResult: number;
  shortlisted: boolean;
  interviewStatus: 'Cleared' | 'Not Cleared' | 'Not Attempted';
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
    accessorKey: 'quizResult',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <FileQuestion className="mr-1 size-4 stroke-[2]" />
          Quiz
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
    cell: ({ row }) => {
      return (
        <p>
          {row.getValue('quizResult')}
          <span className="text-[8px] text-neutral-400"> / 20</span>
        </p>
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
  },
  {
    accessorKey: 'shortlisted',
    header: ({ column }) => {
      return (
        <h2
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="group flex cursor-pointer items-center gap-1 font-medium text-neutral-800 duration-300 hover:opacity-80"
        >
          <Trophy className="size-4 stroke-[2]" />
          Shorlisted
          <ChevronsUpDown className="ml-6 h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
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
          <ChevronsUpDown className="h-4 w-4 opacity-0 duration-300 group-hover:opacity-100" />
        </h2>
      );
    },
    cell: ({ row }) => {
      return (
        <h2
          className={`-ml-3 w-[7rem] rounded-2xl py-2 text-center text-xs font-medium ${
            row.getValue('interviewStatus') === 'Cleared'
              ? 'bg-green-100 text-green-700'
              : row.getValue('interviewStatus') === 'Not Attempted'
                ? 'bg-neutral-100 text-black'
                : 'bg-red-400 text-white'
          }`}
        >
          {row.getValue('interviewStatus')}
        </h2>
      );
    },
  },
];
