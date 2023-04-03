import { Box } from "@oasis/react-core";
import { Status } from "../AccountHistory.Data";
import { ColorPallete } from '../../../../theme/ColorPallete';

export default function StatusLabel(props) {
    const { data } = props;
    return (
        <>
            {(data.statusCode == Status.active) ?
                <Box component={"span"} sx={{
                    fontSize: "12px", padding: "0px 8px",
                    borderRadius: "4px",
                    color: ColorPallete.Text.Primary,
                    backgroundColor: ColorPallete.Color.lightGreen
                }} dangerouslySetInnerHTML={{
                    __html: data.status,
                }}></Box> : ""}

            {(data.statusCode == Status.inactive) ?
                <Box component={"span"} sx={{
                    fontSize: "12px", padding: "0px 8px",
                    borderRadius: "4px",
                    color: ColorPallete.Color.AlertBackground,
                    backgroundColor: ColorPallete.FormInput.backgroundColor
                }} dangerouslySetInnerHTML={{
                    __html: data.status,
                }}>
                </Box> : ""}
            {(data.statusCode == Status.pending) ?
                <Box component={"span"} sx={{
                    fontSize: "12px", padding: "0px 8px",
                    borderRadius: "4px",
                    color: ColorPallete.Text.Primary,
                    backgroundColor: ColorPallete.Alert.Warning.backgroundColor
                }} dangerouslySetInnerHTML={{
                    __html: data.status,
                }}>
                </Box> : ""}

        </>);
}