import * as React from "react";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";

interface PDFProps {
  url: string;
}

const FIGMA_VIEWPORT_WIDTH = 595;
const A4_IN_PX = 793.7008;
const SCALE_DIFF = A4_IN_PX / FIGMA_VIEWPORT_WIDTH;
const figmaPxToRealSize = (pxSize: number) =>
  `${Math.round(SCALE_DIFF * pxSize)}px`;

type FallbackFont =
  | "Arial"
  | "Helvetica"
  | "Verdana"
  | "Georgia"
  | "Times New Roman";

type FontFormat =
  | "woff"
  | "woff2"
  | "truetype"
  | "opentype"
  | "embedded-opentype"
  | "svg";

type FontWeight = React.CSSProperties["fontWeight"];
type FontStyle = React.CSSProperties["fontSize"];

const shared = {
  content: {
    padding: `${figmaPxToRealSize(7)} ${figmaPxToRealSize(19)}`,
  },
} satisfies Record<string | symbol, React.CSSProperties>;

// GETOUT FLEX!

const styles = {
  paper: {
    width: figmaPxToRealSize(595),
    height: figmaPxToRealSize(842),
    padding: figmaPxToRealSize(32) + " " + figmaPxToRealSize(45),
    boxSizing: "border-box",
    fontFamily: "Open Sans",
  },
  divider: {
    margin: "5px 0",
  },
  head: {
    border: 0,
    padding: 0,
    width: "100%",
  },
  headContent: {
    border: 0,
    padding: 0,
  },
  documentTitleContainer: {
    textAlign: "left",
  },
  documentTitle: {
    fontSize: figmaPxToRealSize(11),
    fontWeight: 600,
    letterSpacing: "2px",
    whiteSpace: "nowrap",
    textAlign: "right",
  },
  documentSubtitle: {
    fontSize: figmaPxToRealSize(8),
    fontWeight: 400,
    letterSpacing: "1px",
    whiteSpace: "nowrap",
    textAlign: "right",
  },
  logo: {
    width: figmaPxToRealSize(119),
  },
  container: {
    marginBottom: "10px",
  },
  title: {
    ...shared.content,
    background: "#2E4350",
    color: "white",
    textTransform: "uppercase",
    fontSize: figmaPxToRealSize(8),
    fontWeight: 700,
    letterSpacing: "2px",
  },
  content: {
    ...shared.content,
    lineHeight: figmaPxToRealSize(12),
    paddingBottom: figmaPxToRealSize(5),
    paddingTop: figmaPxToRealSize(10),
    background: "#EEEEF1",
    fontSize: figmaPxToRealSize(8),
  },
  contentTable: {
    ...shared.content,
    paddingBottom: figmaPxToRealSize(12),
    paddingTop: figmaPxToRealSize(7),
    background: "#EEEEF1",
  },
  table: {
    width: "100%",
    border: 0,
  },
  fieldName: {
    fontWeight: 600,
    fontSize: figmaPxToRealSize(8),
    padding: "10px 0",
    whiteSpace: "nowrap",
  },
  fieldColon: {
    fontSize: figmaPxToRealSize(8),
    padding: "0 5px 0",
  },
  fieldValue: {
    fontSize: figmaPxToRealSize(8),
    fontWeight: 400,
    width: "40%",
    borderBottom: "1px solid #2E4350",
  },
  fieldEmpty: {
    width: "5%",
  },
  contentAlphaList: {
    paddingInlineStart: "12px",
    listStyle: "lower-latin",
  },
  contentAlphaItem: {
    marginBottom: "10px",
  },
  contentUList: {
    paddingInlineStart: "12px",
    listStyle: "square",
  },
  contentUItem: {
    marginBottom: "5px",
  },
  signTitle: {
    fontSize: figmaPxToRealSize(7),
    fontWeight: 600,
  },
  signDate: {
    fontSize: figmaPxToRealSize(6),
    fontWeight: 600,
    marginBottom: "10px",
  },
  signArea: {
    padding: `${figmaPxToRealSize(7)} ${figmaPxToRealSize(
      15
    )} ${figmaPxToRealSize(2)}`,
    background: "white",
    borderRadius: figmaPxToRealSize(2),
    fontSize: figmaPxToRealSize(23),
    fontFamily: "Astagina Signature",
    lineHeight: figmaPxToRealSize(30),
    minWidth: figmaPxToRealSize(80),
    minHeight: figmaPxToRealSize(30),
    textAlign: "center",
  },
} satisfies Record<string | symbol, React.CSSProperties>;

export interface FontProps {
  fontFamily: string;
  fallbackFontFamily: FallbackFont | FallbackFont[];
  webFont?: {
    url: string;
    format: FontFormat;
  };
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
}

const FontStyle = ({
  webFont,
  fontFamily,
  fontStyle,
  fontWeight,
  fallbackFontFamily,
}: FontProps) => {
  const src = webFont
    ? `src: url(${webFont.url}) format('${webFont.format}');`
    : "";
  const font = `
    @font-face {
      font-family: '${fontFamily}';
      font-style: ${fontStyle ? fontStyle : ""};
      font-weight: ${fontWeight ? fontWeight : ""};
      mso-font-alt: '${
        Array.isArray(fallbackFontFamily)
          ? fallbackFontFamily[0]
          : fallbackFontFamily
      }';
      ${src}
    }
    * {
      font-family: '${fontFamily}', ${
    Array.isArray(fallbackFontFamily)
      ? fallbackFontFamily.join(", ")
      : fallbackFontFamily
  };
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: font }} />;
};

const GlobalStyle = () => {
  const style = `
    h1, h2, h3, h4, h5, h6, p {
      padding: 0;
      margin: 0;
    }
    body {
      font-size: ${figmaPxToRealSize(8)},
    }

    @font-face {
      font-family: 'Astagina Signature';
      src: url('./fonts/astagina_signature/font.eot');
      src: url('./fonts/astagina_signature/font.eot?#iefix') format('embedded-opentype'),
           url('./fonts/astagina_signature/font.woff2') format('woff2'),
           url('./fonts/astagina_signature/font.woff') format('woff'),
           url('./fonts/astagina_signature/font.ttf')  format('truetype'),
           url('./fonts/astagina_signature/font.svg#Astagina Signature') format('svg');
  }
  `;

  return <style dangerouslySetInnerHTML={{ __html: style }} />;
};

const PDF: React.FC<Readonly<PDFProps>> = ({ url }) => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800"
        ></link>
        <GlobalStyle />
      </Head>
      <section style={styles.paper}>
        <table style={styles.head} cellSpacing="0" cellPadding="0">
          <tr>
            <td style={styles.headContent} width="100%">
              <Img
                style={styles.logo}
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE5IiBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMTE5IDM0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij4KPHJlY3Qgd2lkdGg9IjExOSIgaGVpZ2h0PSIzNCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPC9nPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF8xOTgxNl83NzgwIiB0cmFuc2Zvcm09InNjYWxlKDAuMDAyMzgwOTUgMC4wMDgzMzMzMykiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF8xOTgxNl83NzgwIiB3aWR0aD0iNDIwIiBoZWlnaHQ9IjEyMCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFhUUFBQUI0Q0FNQUFBQ0tHWGJuQUFBQXQxQk1WRVgvLy84RVZKOEFBQUFBUVpjQVJwa0FRNWpvN2ZUUTJPY0FUNTNCemVBQVNab0FVcDcyOXZZQVRKdVRxTXJLMU9XdXZ0ZGVnYlVkWGFOb2lMbnM3T3lYbDVmRXhNU3hzYkZpWW1KNWVYbUxpNHRaV1ZuWDE5ZWxwYVhNek13c0xDeUNnb0tIbjhWVVZGVGk0dUs1dWJrQVBKVkVSRVFPRGc1UWViRTBORFRiMjlzdExTMXdjSEFpSWlLZG5aMGFHaHJmNWU5MGtiNmp0ZEkwWjZnQUxKQUFOSk9jcjg1RGNLeEFRRUMzeGR4L21zSUFONVFuWWFWRkV5dmRBQUFLamtsRVFWUjRuTzJkYTBQaU9oQ0dTMHV4VWtCRnZDR3lDT0p0UlVGMmRkM2ovLzlkUjVySmZkSVdiWVdlTSs4blNhYWw1R21TeVdSYVBZOUVJcEZJSkJLSlJDS1JTQ1FTcVV3MU5xbldwbjk5UmZRcjNKeCs3Mjc2MTFkRVFXMXpxaE9rZkNKSUZSQkJxb0FJVWdWRWtDb2dnbFFCRWFRS2lDQlZRQVNwQWlKSUZSQkJxb0FJVWdWRWtDb2dnbFFCQ1VoTlRPMEliZDBZTlZha0hOYTJhMk9DdEo0NHBPWStwcGZib0IyYmlHcng2eHRxTGZSMklDaTFPNWJ0MjJ0TWtOWVNoeFE0Nmx1ZDBPcE4wV0hXV1MvYllraWIyN1VjSVVIS3FTeElINWhlbXdScHMrS1FRalhmd0VnL09HeW1RWklwQzdKTWdiUm5mK2N0UVZwUHduRUl1aDBPcHZVckNNSWdPaFJ0ZUd1TWVGRmQxbmxSd0RWOTU2VVNVcTNlWHFpY1dpK3ZVMzQyZ3BSVDBnV1AyOEVPSzJ1eHdpaGNjbXhOdzN1SW8zcVhkNXl1ckl1bno2eE1nZlJoR3k1RkordE1sVk1ScEp4UzEwbHhrNVcxZUdIVUJhdDljMXI2cUd0RFhWY0ZPR1djVlVoSnp3UGFIVzFaUnBCeUNtdTFsbHc4WFlJWjRvZzNvZGRva0dLRzFZQlVhNzR3MjZsV1NwQnlTb1BVN2lSbEVwSncrc3hXcjBuM1FZTlVxNzloNW5CaUk3NUJrSEpLYTdab2taUXBrSnB2ekd5bmJrTTZZRlU2cEhpNUtpTkloVXFIeERxSEFnbXdZVEUrSEZJdFdDMk1DRktoeW9BVXY0UGQwcHFVSEpBU0hnU3BVR1ZBRXBQU29SMGN3aUVscmdOQktsU1prR0NKWTNzT0RrakpFUVNwVUdWQkNpSDIxc2tOYWVXYUU2UkNsUVdwdmpha1ZYbUprUDZQenpRVkQ2bFc5N3kvWDRIVVN0UHhhV0xURXdYYUVUMzMyVksvSi9VcXJLcWUrNmpreU42azk0bGJhZVN1eWp2Y21jMmVBcWtXaEtieFdwQWUvVFFsdjJYeUFKOU9CNnVQUTE1NVpqVk9iOHhxK3ZiM2lLUDhnVjNadTRhNnNWMDVnaHFieE9EeDlBbU91emsvR3VxVko5Zm5LYnJ6MGNaSWxBa0pISWVEUE41ZDNMWURFK3REOG80eUlYa2VvM1RPZno5VVlqZHdVdkdBZlErL0cwNnd5aDVVSGlOMTUwbU5XVG9aV1JkN2ZxVWFuRmoxbXZER1dDbXZDMTdMc1U2S2w1ZVhlRkpFOFpET2tnK241czlIS0NYbFo5ajN6T0NnR1ZiSklmbER1KzRVYWRUSjJIRzlQVEdQSHBjRXlRcU1wMEZhaFNmczhORzNRa0xhMndsSnRobldXd1FrLzk2cVF5Q2R1YTk0ek05UUdxUlhacmFYSjNiWHZ0dzRKUC9PT3BzVDByVTQ2QTlTS3lINUU3UE9ndFI3OGxOMEJGWmxRV3IvWldhMjM0QkJlaWtTMHV4K2dPZ0laaGNYSlAvYVBKc0wwcjNTUHBqbm9GU2JUcU1KYVNJc1ovMnIrdy9YcmpVNVBoTDNnT2pkQU9rQ1ZmL3prSGdVSE5sUHNpRTFkNHVFOUJPdmhLSEpDVWs0RTF3dVNBOHB4M2c2SkhPcU15QUowd2V0ejdWT2Z1cDN3SEZxajNsMGxIdVprS2JzOHQ2UXRyY2hyUUpDeFVINjRiNW9MdzJTNmNrNUlMV1M4cnN4TzhZYTBYUklUM3FkQVFrY2tKbDlrdUdUK3RYcGtGS1VEaW02WlZiMldnaUJGTmU4cllERXB5MlFBeEw3a3BNaEN0WXpJQm5kV29mVVp5Wmo5RHIvS0V4S2doU3dSSjhYTzhVQmdaVHNrVzhTMGhWdjBpUFYwZ0dKTnhoTStmWXFPQ2wraEo2bVQzVWFwQjZHVWFpdnJKVEtnZFJrbi9mUXJINFRFdlBXTnducFhremdGNG9sRG9rZDBSZWQwSXBJQUNUdmgyOTNGQTBTTEdHUmlKU3BNaUJGQWZ1NGl6OTVZVUNLV0tMUUppRU52QUducE55L09LU1o2RDgrM25ROTZKT3RHekE0bFhVYUpOL1JWVzBWQytsWEdBYlQrSkNOZFIyY2tZQ1VKRWVHMHdNV1B5ck51enZXVi80NEpMa1VrZXRUdEEzWlZQUWd2ODAzblNzT0NUd003UndxSkxndkVDZmVFZzdwL2dvMVZvVkI4cFFRNy93ZG00OVVTRWxBV0dRL0ZnZnBxVDlTNWVlQ0pGMEkwV29vcEhGU21rUUNPQVREUWtDU0xvUVlFbFZJRi9tN0IwRHE2OEpEaDVwUVNFS04yOTk0TUU2QnBLdThpRU0rU0RLR3pxTTVHQ1EyZVlFekFKT0swVllTa2x6Mjh0Nm1RaHFwcDBxWEkrTHd5WjRrTlgvcDFoSDNlNHNoY1k5WVRPVVlKSFkwREluUVU0eTFrQUpKYm1vQVNCVVMreHVOc3BzcUM5S0g5cFo0dzI4ckpCbEtZRU0yQXFtbFUySHRiSVJaVlVqbVZLZENPc2R1QWx6RlFvcmUzOSs3Nzh0RGlBbTlwTHJneSs3SytBQ1NqcmNBRXJTYjc5OGtsSkJHWkVPaUdOOWc3dGRqc3hva09kVWxWN0VWUFdrYUo0b0M0TENyNTNEcmtMcFJZbHV2SlUxU0hLU2JVM1hqY3J3R0pCSGZUa0tiQ0NSZmFlU1Z4cjUrL0VvNkpIbmpyS1k2RlJLN2tIWG1wRE5kbjNVY1JHRjd5UW93U3VaaU5rcnlLRXR6d2EvV2dPVGQrYkp6MkpCWVpPTHB4d3owQTRKdldtREhnT1NKYmRmSlY3MDdvL1FlMjgzU2xRNUpQUHpTeWJHZkZLN2FmTE9MV1NHK3YzT05RZUlJTGFrUlVoT1NuT3A2R2lSd0twRDlXMHVGTG1iVndqYUVXRit6Y3h5U283Y0VrbGlCbnR1UVJGakNranF6V0pERVZPZGpFUWNsSHFGTEdjeEtnOFJqckEzTGViQ2o0SFZ2YXlESkZlaVpCZW5VQ1VrTndObVF4RlIzcHlXaVFBOXpoUnlPSlBueUlQRXlLeGw4Ky9hVHRIYVN1NlVHSkgwUFF0ZklOTk1nZVQ4MVl5Z2M2QjlOM1VqWHZqeEl0WkNWemNOTVNLc256YmNHa2o2cUtaQ1lCekFhYWhwY213MklRUkxCVnMwV2hzRVptbUs1bXY5NFJabVFJRDNTYkhoayszeC9teUJweXhJRkV0NVNZQ3loWUpEa1ZLZWVRaFRhQ3g1Mlhkdy9MeEVTYjhxRmtZdFNkaUxLbHlHcCs3VVNFbk9aUjlZSlowWUxvcEMwc1ZJVWlydmhUc1BVdXVBKzVxTm01L2hGQTdlRG1BMXAxVDlXTXA5QVJ5QjF0Z3VTa3JBc0liRVJ5OTZpZzIxZDRZemhrTlFjSTFtbzNBM2pvNnZoWkRJWlhNbHNJWi83OXZoaVZpeHEzZXVsYkVodGVITGNmR3dXeTJCZExJckxZQzBBa2d5MkNrakgybkdxbU9FTi8raUFwR1NRSzRYcEdYV0RYRlpmZ3dRTmJIb09XQzU0NU5qWTJCUWtzUUlWa1A0b2Q3WXVDQjN3RWNzRlNUYTFXdGhUKzQwdXl3VXZFMUlqRzVKVEJlYmRnWEpDNG9zaURvbU5Wa2lhbmNlN0VnK3pPaUdKd1UwdlBlYkpFTHJHU3BMeWZ4RFNFMTRKWWwyRVI5dmNrQ0I0eW05bnhneWZvaUdHQ3BWdVNIeXFNNHVIYXJvbDAwanJzcW5wMDErRHhOOThrbU80S3dZU24wandSTFpFOXp4cWNKNDBLZHlpTjBqakQyRnB3N29TREVyb1NEcmh2bGlTYXRTREFCOUNxUVZuK1lNOG4zVHhBSlUzMTJjblJxYi8xYWlmcHE5QmNyeHZvN3llOVAvVXhINTZneXZIT2duZWhMWkxrRGFsYkVqOEpRSFBtZXNrZ2xTU01pSHh4OGc4Y3dsRWtMNU4yVkZ3bm0rQ3ZRb0FLeWRJaFNzVEVvOEtXUnRLQk9uYnBFTmEySVg4eVdaelNpSkkzeWQ5M1FvdmlsUWVOZWRGTmd0TzFINS9seHNTdlRueVUwTFhyWEpYSXVadldyV2Y5ZU9CVi9zTkQ3YjRtS20vY0pjZzVaUUdhUXI3ZTNOeHg4T0xiN0gzT0hEalozeDNRcmNGTi81UTI1TWlTRG1sK1FpM3ZQUXlLWTZiVGM3STNQR0xvMm1IR3k5ZDJlTENPSUJuMkwyRzlrSWJncFJUQWxJOURCYXllTDhkaGtGTmNIalI0M1pSMEY0by85N2dlVGwxOTZabUdIVDNoV25qTUF4QytxOHZhNHBEcXM4YmVrVmpMdU9IeG5OazBZRVpXbXpOWFpTYXV3M0R1Tkc0cGYvNnNwNTQ4N3Yvb1lqWHVqV2pkc2pERjQ3SEFla2ZpaFNoVEVqenY0R1ZjVWVRdmxkaXVOdER0UHU4cUZudnJsdTkzV0hITW5VT2QvdVc3UTc5azZzMUpSMEhSTTFtaERwdWtXM3FZUFJCeWJZbHgyRk51WWFwN3hCQnlpbUNWQUVScEFxSUlGVkFCS2tDSWtnVkVFR3FnQWhTQlVTUUtpQ0NWQUVScEFxSUlGVkFCS2tDSWtnVjBHOXNpK0tiOUE5QnlxZTluUTJxa1gxOUpCS0pSQ0tSU0NRU2lVUWlrVWlrd3ZRdlcrNEdaQ29UNW1nQUFBQUFTVVZPUks1Q1lJST0iLz4KPC9kZWZzPgo8L3N2Zz4K"
              />
            </td>
            <td style={styles.headContent}>
              <h3 style={styles.documentTitle}>FORM F-100</h3>
              <p style={styles.documentSubtitle}>Agent Consent Form</p>
            </td>
          </tr>
        </table>
        <Hr color="#D9D9D9" style={styles.divider} />
        <div style={styles.container}>
          <div style={styles.title}>Personal Information</div>
          <div style={{ ...styles.content, ...styles.contentTable }}>
            <table style={styles.table} cellSpacing="0" cellPadding="0">
              <tr>
                <td style={styles.fieldName}>Nama</td>
                <td style={styles.fieldColon}>:</td>
                <td style={styles.fieldValue}>{`{{name}}`}</td>
                <td style={styles.fieldEmpty}></td>
                <td style={styles.fieldName}>NIK</td>
                <td style={styles.fieldColon}>:</td>
                <td style={styles.fieldValue}>{`{{nik}}`}</td>
                <td style={styles.fieldEmpty}></td>
              </tr>
              <tr>
                <td style={styles.fieldName}>Jenis Kelamin</td>
                <td style={styles.fieldColon}>:</td>
                <td style={styles.fieldValue}>{`{{gender}}`}</td>
                <td style={styles.fieldEmpty}></td>
                <td style={styles.fieldName}>Email</td>
                <td style={styles.fieldColon}>:</td>
                <td style={styles.fieldValue}>{`{{email}}`}</td>
                <td style={styles.fieldEmpty}></td>
              </tr>
              <tr>
                <td style={styles.fieldName}>Alamat</td>
                <td style={styles.fieldColon}>:</td>
                <td style={styles.fieldValue} colSpan={5}>{`{{address}}`}</td>
                <td style={styles.fieldEmpty}></td>
              </tr>
            </table>
          </div>
        </div>
        <div style={styles.container}>
          <div style={styles.title}>Consent Statement</div>
          <div style={styles.content}>
            <p>
              Sehubungan dengan data/informasi serta dokumen-dokumen yang saya
              berikan tersebut di atas, maka dengan ini Saya menyatakan dengan
              sesungguhnya hal-hal sebagai berikut:
            </p>
            <ol style={styles.contentAlphaList}>
              <li style={styles.contentAlphaItem}>
                Identitas Saya sebagaimana tercantum di atas adalah benar nama
                dan tempat berdomisili Saya pada saat ini, sesuai identitas diri
                yang telah Saya serahkan kepada BFI. Dalam hal terdapat
                perubahan dan/atau perbedaan data (-data) antara yang tercantum
                dalam identitas diri Saya tersebut di atas dengan fakta yang
                sebenarnya terjadi, maka Saya akan memberitahukan hal tersebut
                secara tertulis kepada BFI.
              </li>
              <li style={styles.contentAlphaItem}>
                Saya bersedia menjadi agent untuk BFI dengan syarat-syarat dan
                ketentuan sebagaimana yang telah ditentukan oleh BFI. Dalam hal
                ini Saya bukan dan tidak termasuk serta tidak merupakan bagian
                dari karyawan BFI, sehingga Saya tidak berhak bertindak untuk
                dan atas nama serta mewakili kepentingan BFI, menggunakan
                fasilitas serta segala sesuatu yang berhubungan dengan BFI.
              </li>
              <li style={styles.contentAlphaItem}>
                Saya dengan ini berjanji untuk melaksanakan tugas dan fungsi
                Saya sebagai agent, yang termasuk namun tidak terbatas didalam
                memasarkan fasilitas pembiayaan milik BFI kepada (para) Debitur
                dengan cara menyerahkan aplikasi permohonan pembiayaan konsumen
                dalam bentuk Formulir Permohonan Pembiayaan (FPP) atas
                masing-masing Debitur yang bermaksud memperoleh fasilitas
                pembiayaan dengan jaminan mobil dan/atau motor kepada BFI.
              </li>
              <li style={styles.contentAlphaItem}>
                Saya bersedia untuk mematuhi aturan BFI untuk tidak melakukan
                hal-hal sebagai berikut:
                <ul style={styles.contentUList}>
                  <li style={styles.contentUItem}>
                    Meminta dan/atau menerima uang pengurusan/komisi/hadiah atau
                    dalam bentuk apapun dari Pemohon.
                  </li>
                  <li style={styles.contentUItem}>
                    Meminta dan/atau menerima angsuran dan/atau pembayaran dari
                    Konsumen.
                  </li>
                  <li style={styles.contentUItem}>
                    Meminta dan/atau menerima asli dokumen/data (-data) dari
                    Pemohon.
                  </li>
                  <li style={styles.contentUItem}>
                    Memberikan informasi yang menyesatkan kepada Pemohon,
                    misalnya: "bisa mempercepat proses pembiayaan", "pasti
                    disetujui" dan lain-lain.
                  </li>
                  <li style={styles.contentUItem}>
                    Mengubah/memalsukan data (-data) Pemohon, atau membujuk/
                    mengajarkan Pemohon supaya memalsukan data (-data) yang
                    diberikan kepada BFI.
                  </li>
                  <li style={styles.contentUItem}>
                    Melakukan hal-hal lain yang dianggap merugikan BFI.
                  </li>
                  <li style={styles.contentUItem}>
                    Melakukan promosi dengan memakai nama BFI dan/atau logo
                    dan/atau merek dagang yang merupakan milik BFI untuk semua
                    bentuk media promosi seperti, iklan koran, web internet,
                    poster, dll, selain media promosi resmi yang diizinkan BFI.
                  </li>
                  <li style={styles.contentUItem}>
                    Menerima titipan aplikasi/pengajuan konsumen dari seluruh
                    karyawan internal PT BFI Finance Indonesia, Tbk dengan
                    alasan apapun itu dan ketentuan lainnya yang telah diatur
                    oleh BFI Finance.
                  </li>
                </ul>
              </li>
              <li style={styles.contentAlphaItem}>
                Untuk setiap FPP yang telah disetujui dan dibukukan serta telah
                dilakukan pencarian dana oleh BFI kepada (para) Debiturnya, maka
                Saya berhak untuk mendapatkan imbalan jasa dari BFI berdasarkan
                ketentuan BFI.
              </li>
              <li style={styles.contentAlphaItem}>
                Untuk setiap FPP yang telah disetujui dan dibukukan serta telah
                dilakukan pencarian dana oleh BFI kepada (para) Debiturnya, maka
                Saya berhak untuk mendapatkan imbalan jasa dari BFI berdasarkan
                ketentuan BFI.
              </li>
            </ol>
            <div>
              <p style={styles.signTitle}>Tanda Tangan Digital</p>
              <p style={styles.signDate}>{`{{date}}`}</p>
              <table>
                <tr>
                  <td>
                    <div style={styles.signArea}>{`{{name_signed}}`}</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Html>
  );
};

export default PDF;
