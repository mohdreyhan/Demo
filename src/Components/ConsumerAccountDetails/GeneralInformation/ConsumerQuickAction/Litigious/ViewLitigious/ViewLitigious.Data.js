export const LitigiousData = [
{
    label: "Litigious",
    accessor: "litigious",
    xs:4
},
{
    label: "File Date",
    accessor: "filedDate",
    operation: ["convertTimetoUTC"],
    xs:8
} ,
{
    label: "Fair Credit Reporting Act (FCRA)",
    accessor: "isFcra",
    operation:["convertBooleanYesNo"],
    xs:4
} ,
{
    label: "Telephone Consumer Protection Act (TCPA)",
    accessor: "isTcpa",
    operation:["convertBooleanYesNo"],
    xs:4

},  
{
    label: "Fair Debt Collection Practices Act (FDCPA)",
    accessor: "isFdCpa",
    operation:["convertBooleanYesNo"],
    xs:4
}  
]