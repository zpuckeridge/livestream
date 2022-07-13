import { Stream } from "@cloudflare/stream-react";

import { useState } from "react";

import {
  Flex,
  Circle,
  Box,
  Image,
  Button,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
} from "@chakra-ui/react";

export const getStaticProps = async () => {
  const response = await fetch("/api/cloudflare");
  const data = await response.json();
  return {
    props: {
      vods: data,
    },
  };
};

const Vods = ({ vods }) => {
  return (
    <Box>
      <Text>Videos</Text>
      {vods.map((vod) => {
        return (
          <Box key={vod.uid}>
            <Stream src={vod.uid} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Vods;

// export default function Vods() {
//   const [vods, setVods] = useState([]);

//   const fetchVods = async () => {
//     const response = await fetch("/api/cloudflare");
//     const data = await response.json();
//     setVods(data);
//   };

//   return (
//     <Box>
//       <Box>
//         <Button onClick={fetchVods}>Load Vods</Button>
//         {vods.map((result) => {
//           return (
//             <Box key={result.uid}>
//               <Stream src={result.uid} />
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }
