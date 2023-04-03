import { Box, ArrowForwardIcon } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';

export default function UpdateTemplate(props) {
  const { data, res } = props;
  return (
    <Box>
      <Box component={'div'} sx={{ display: 'flex', alignItems: 'center !important' }}>
        {!res.isDefaultValueChanged && res.isChanged ? (
          <>
            <Box
              component={'span'}
              sx={{
                color: ColorPallete.Text.Primary,
                fontSize: '12px',
                fontWeight: '700',
                marginRight: '10px'
              }}
              dangerouslySetInnerHTML={{
                __html: res.defaultValue.type
              }}></Box>
            <Box
              component={'span'}
              sx={{
                fontSize: '12px',
                color: ColorPallete.Text.Secondary,
                marginRight: '10px'
              }}
              dangerouslySetInnerHTML={{
                __html: res.defaultValue.val
              }}></Box>
          </>
        ) : (
          ''
        )}
      </Box>
      {Object.keys(data)?.map((item) => {
        if (item.includes('_label')) {
          return (
            <Box
              component={'div'}
              key={`key_${item}`}
              sx={{ display: 'flex', alignItems: 'center !important' }}>
              <Box>
                <Box
                  component={'span'}
                  sx={{
                    color: ColorPallete.Text.Primary,
                    fontSize: '12px',
                    fontWeight: '700',
                    marginLeft: '16px',
                    marginRight: '10px'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data[item]
                  }}></Box>
                {data[`${item.replace('_label', '')}_fromValue`] ? (
                  <Box
                    component={'span'}
                    sx={{
                      fontSize: '12px',
                      color: ColorPallete.Text.Secondary,
                      marginRight: '10px'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data[`${item.replace('_label', '')}_fromValue`]
                    }}></Box>
                ) : (
                  ''
                )}
                {data[`${item.replace('_label', '')}_toValue`] ? (
                  <ArrowForwardIcon
                    sx={{
                      color: ColorPallete.Button.Secondary,
                      fontSize: '12px',
                      marginRight: '10px'
                    }}
                  />
                ) : (
                  ''
                )}
                {data[`${item.replace('_label', '')}_toValue`] ? (
                  <Box
                    component={'span'}
                    sx={{
                      fontSize: '12px',
                      color: ColorPallete.Text.Secondary
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data[`${item.replace('_label', '')}_toValue`]
                    }}></Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          );
        }
      })}
    </Box>
  );
}
