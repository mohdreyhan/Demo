import { ColorPallete } from "./ColorPallete";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1600,
      },
    },
    components: {
      // MuiToolbar: {
      //   styleOverrides: {
      //     root: {
      //       fontFamily: "poppins",
      //       minHeight: "unset",
      //       padding: "0px 24px 0px 24px",
      //       "@media (min-width: 600px)": {
      //         minHeight: "unset",
      //         padding: "0px 24px 0px 24px",
      //       },
      //     },
      //   },
      // },
      MuiAutocomplete: {
        styleOverrides: {
          noOptions: {
            padding: "0",
          },
        },
      },
      // MuiTabPanel: {
      //   styleOverrides: {
      //     root: {
      //       padding: "0px !important",
      //     },
      //   },
      // }, //NOSONAR
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: "5px",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: ColorPallete.Button.Tertiary, //"#E0E0DF",
          },
        },
      },
      // MuiTableCell: {
      //   styleOverrides: {
      //     root: {
      //       fontFamily: "Poppins",
      //     },
      //     head: {
      //       // zIndex: 'unset !important',
      //       padding: "0px 12px 0px 12px",
      //       color: ColorPallete.Table.Secondary,
      //       backgroundColor: "rgb(224, 224, 224)",
      //       "&:first-child": {
      //         paddingLeft: '24px',
      //         position: "sticky",
      //         left: "0px",
      //         boxShadow: "2px 0px 3px rgb(68 68 68 / 16%)",
      //         zIndex: "88",
      //       },
      //       "&:last-child": {
      //         padding: "0px 5px",
      //         position: "sticky",
      //         right: "0px",
      //         // boxShadow: "-2px 0px 2px rgb(68 68 68 / 40%)",
      //         boxShadow: "-2px 0px 6px rgb(68 68 68 / 16%)",
      //       },
      //       "& p": {
      //         fontSize: "12px",
      //         fontWeight: "700",
      //       },
      //       "& .selected td": {
      //         color: "#000000",
      //       },
      //     },
      //     body: {
      //       padding: "0px 12px 0px 12px",
      //       "&:first-child": {
      //         position: "sticky",
      //         paddingLeft: '24px',
      //         left: "0px",
      //         boxShadow: "2px 0px 3px rgb(68 68 68 / 16%)",
      //         backgroundColor: ColorPallete.Color.White,
      //       },
      //       "&:last-child": {
      //         padding: "0px 5px",
      //         position: "sticky",
      //         right: "0px",
      //         backgroundColor: ColorPallete.Color.White,
      //         // boxShadow: "-2px 0px 2px rgb(68 68 68 / 40%)",
      //         boxShadow: "-2px 0px 6px rgb(68 68 68 / 16%)",
      //       },
      //       "& p": {
      //         fontSize: "14px",
      //         fontWeight: "400",
      //       },
      //     },
      //   },
      // },
      MuiTab: {
        styleOverrides: {
          root: {
            color: ColorPallete.Border.Primary,
            textTransform: "capitalize",
            fontFamily: "poppins",
            fontSize: "16px",
            fontWeight: "400",
            "&.Mui-selected": {
              color: ColorPallete.Button.Primary,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "poppins",
            marginBottom: "0px !important",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow: "unset",
            "&.MuiAccordion-root": {
              "&:first-of-type": {
                borderTopLeftRadius: "unset",
                borderTopRightRadius: "unset",
                borderRadius: "8px",
              },
              "&::before": {
                display: "none",
              },
              // borderBottom: "1px solid #E5E5E5",
              "&.Mui-expanded": {
                margin: "0px",
                minHeight: "unset",
              },
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "& .MuiAccordionSummary-root": {
              "& .Mui-expanded": {
                margin: "0px 0",
              },
            },
            "& .MuiAccordionSummary-content": {
              margin: "0px 0",
              "& .Mui-expanded": {
                margin: "0px 0",
              },
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: "7px 16px",
            minHeight: "auto",
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: ColorPallete.Color.White,
              backgroundColor: ColorPallete.Button.Primary,
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5) !important",
            borderRadius: "8px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: "poppins",
            "& .MuiOutlinedInput-input": {
              padding: "8px",
            },
          },
          input: {
            "&::placeholder": {
              color: `${ColorPallete.Text.Secondary} !important`,
              fontSize: "14px !important",
              opacity: "1 !important",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-input": {
              padding: "8px",
              textTransform: "none !important",
            },
            textTransform: "none !important",
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            "& .Mui-disabled": {
              cursor: "pointer !important",
            },
          },
        },
      },
      // MuiCalendarPicker: {
      //   styleOverrides: {
      //     root: {
      //       width: "300px",
      //       margin: "0px"
      //     },
      //   },
      // },
    },
  };
};
