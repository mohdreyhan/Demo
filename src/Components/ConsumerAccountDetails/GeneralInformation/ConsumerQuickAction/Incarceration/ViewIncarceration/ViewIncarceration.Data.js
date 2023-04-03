export const viewIncarcerationData = [
  {
    id: 1,
    label: 'Incarcerated',
    accessor: 'isIncarcerated',
    operation: ["convertBooleanYesNo"],
  },
  {
    id: 2,
    label: 'Penitentiary',
    accessor: 'penitentiary'
  },
  {
    id: 3,
    label: 'Expected Release Date',
    accessor: 'expectedReleaseDate',
    operation: ["convertTimetoUTC"],
  },
  {
    id: 4,
    label: 'Verified Date',
    accessor: 'verifiedDate',
    operation: ["convertTimetoUTC"],
  }
];
