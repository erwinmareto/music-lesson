'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';

export interface InstrumentsData {
  id: number;
  name: string;
  student: {
    students_id: string;
  };
  teacher: {
    teachers_id: string;
  };
}

export interface PackagesData {
  id: number;
  name: string;
  student: {
    first_name: string;
  };
  instruments: {
    name: string;
  };
  start_datetime: string;
  end_datetime: string;
}

export interface LessonData {
  id: number;
  package: {
    name: string;
  };
  start_datetime: string;
  status: 'attended' | 'missed' | 'cancelled';
  teacher: {
    first_name: string;
    last_name: string;
  };
}

export interface PaymentData {
  id: number;
  payment_id: string;
  currency: string;
  rate: number;
  payment_date: string;
  package: {
    name: string;
  };
}

export const lessonsColumns: ColumnDef<LessonData>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'package.name',
    header: 'Package Name'
  },

  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'teacher.first_name',
    header: 'Teacher'
  },
  {
    accessorKey: 'start_datetime',
    header: 'Start Date',
    cell: ({ row }) => {
      const parsedDate = parseISO(row.getValue<string>('start_datetime'));
      const formattedDate = format(parsedDate, 'MMM d, yyyy');
      return <p>{formattedDate}</p>;
    }
  }
];

export const instrumentsColumns: ColumnDef<InstrumentsData>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'students_count',
    header: 'Student Count'
  },
  {
    accessorKey: 'teachers_count',
    header: 'Teacher Count'
  }
];

export const packagesColumns: ColumnDef<PackagesData>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Package Name'
  },

  {
    accessorKey: 'student.first_name',
    header: 'Student'
  },
  {
    accessorKey: 'instrument.name',
    header: 'Instrument'
  },
  {
    accessorKey: 'lessons_count',
    header: 'Lessons Amount'
  },
  {
    accessorKey: 'duration',
    header: 'Duration'
  },
  {
    accessorKey: 'start_datetime',
    header: 'Start Date',
    cell: ({ row }) => {
      const parsedDate = parseISO(row.getValue<string>('start_datetime'));
      const formattedDate = format(parsedDate, 'MMM d, yyyy');
      return <p>{formattedDate}</p>;
    }
  },
  {
    accessorKey: 'end_datetime',
    header: 'End Date',
    cell: ({ row }) => {
      const parsedDate = parseISO(row.getValue<string>('end_datetime'));
      const formattedDate = format(parsedDate, 'MMM d, yyyy');
      return <p>{formattedDate}</p>;
    }
  }
];

export const paymentsColumns: ColumnDef<PaymentData>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'payment_id',
    header: 'Payment ID'
  },

  {
    accessorKey: 'currency',
    header: 'Currency'
  },
  {
    accessorKey: 'rate',
    header: 'Rate'
  },
  {
    accessorKey: 'package.name',
    header: 'Package Name'
  },
  {
    accessorKey: 'payment_date',
    header: 'Payment Date',
    cell: ({ row }) => {
      const parsedDate = parseISO(row.getValue<string>('payment_date'));
      const formattedDate = format(parsedDate, 'MMM d, yyyy');
      return <p>{formattedDate}</p>;
    }
  }
];
