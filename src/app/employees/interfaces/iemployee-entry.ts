export interface IEmployeeEntry {
  Id: string;
  EmployeeName: string | null;
  StarTimeUtc: string;  // You may convert this to Date later if needed
  EndTimeUtc: string;   // Same as above
  EntryNotes: string;
  DeletedOn: string | null;  // Could also be Date if needed, depending on how you want to handle it
}
