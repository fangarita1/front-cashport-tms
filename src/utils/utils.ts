import { IChanel } from "@/types/bre/IBRE";

interface Subline {
  id: number;
  description: string;
}

interface MyObject {
  idChannel: number;
  idLine: number;
  subline: Subline;
}
export function removeDuplicatesBySublineId(array: MyObject[]): MyObject[] {
  const uniqueMap = new Map<number, MyObject>();

  array.forEach((item) => {
    const sublineId = item.subline.id;
    if (!uniqueMap.has(sublineId)) {
      uniqueMap.set(sublineId, item);
    }
  });

  const uniqueArray: MyObject[] = Array.from(uniqueMap.values());

  return uniqueArray;
}
export function removeObjectsFromArray(
  originalArray: MyObject[],
  objectsToRemove: MyObject[]
): MyObject[] {
  const objectsToRemoveSet = new Set(objectsToRemove.map((obj) => JSON.stringify(obj)));

  const newArray = originalArray.filter((obj) => !objectsToRemoveSet.has(JSON.stringify(obj)));

  return newArray;
}
export function removeDuplicatesFromArrayNumbers(array: number[]): number[] {
  const uniqueSet = new Set(array);
  const uniqueArray = Array.from(uniqueSet);
  return uniqueArray;
}

export const filterBRbyIdSubline = (brs: any[], sublinesIds: number[]) => {
  if (sublinesIds?.length === 0) return;
  const filteredResults = brs.filter((channel) => {
    if (channel.CHANNEL_LINES) {
      // Filter channels with non-null CHANNEL_LINES
      channel.CHANNEL_LINES = channel.CHANNEL_LINES.filter((line: any) => {
        if (line.sublines?.length > 0) {
          // Filter lines with non-null sublines
          return line?.sublines?.some((subline: any) => sublinesIds?.includes(subline.id));
        }
        return false; // No sublines in this line
      });

      // Keep the channel only if it has lines after filtering
      return channel.CHANNEL_LINES.length > 0;
    }
    return false; // No CHANNEL_LINES in this channel
  });
  return filteredResults;
};

export const transformFormat = (original: any) => {
  const result = [] as any;

  original.forEach((channel: any) => {
    const idChannel = channel.CHANNEL_ID;

    if (channel.CHANNEL_LINES) {
      channel.CHANNEL_LINES.forEach((line: any) => {
        const idLine = line.id;

        if (line.sublines) {
          line.sublines.forEach((subline: any) => {
            const transformedObject = {
              idChannel,
              idLine,
              subline: {
                id: subline.id,
                description: subline.description
              }
            };
            result.push(transformedObject);
          });
        }
      });
    }
  });

  return result;
};

export const extractChannelLineSublines = (brs: IChanel[]) => {
  const extractedData = {
    channels: [] as { id: number; name: string }[],
    lines: [] as { id: number; name: string }[],
    sublines: [] as { id: number; name: string }[]
  };
  brs.forEach((channel) => {
    // Extract channel information
    const channelInfo = {
      id: channel.CHANNEL_ID,
      name: channel.CHANNEL_NAME
    };
    extractedData.channels.push(channelInfo);
    // Extract line information
    if (channel.CHANNEL_LINES) {
      channel.CHANNEL_LINES.forEach((line) => {
        const lineInfo = {
          id: line.id,
          name: line.description
        };
        extractedData.lines.push(lineInfo);

        // Extract subline information
        if (line.sublines) {
          line.sublines.forEach((subline) => {
            const sublineInfo = {
              id: subline.id,
              name: subline.description
            };
            extractedData.sublines.push(sublineInfo);
          });
        }
      });
    }
  });
  return extractedData;
};

export const stringBasedOnDocumentType = (documentType: string) => {
  switch (documentType) {
    case "NIT":
      return "1 - NIT";
    case "Cedula":
      return "2 - Cedula";
    case "Pasaporte":
      return "3 - Pasaporte";
    case "Cedula de extranjeria":
      return "4 - Cedula de extranjeria";
    default:
      return "0 - No seleccionado";
  }
};

export function extractSingleParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
