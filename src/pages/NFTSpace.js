import { Scrubber } from "@audius/stems";
import { useEffect, useState } from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import PlayIcon from "../components/PlayIcon";
import decode from "../utils/utils";

const NFTSpace = ({api}) => {
  const [tracks, setTracks] = useState([])
  useEffect(() => {
    for (let i = 0;; i++) {
      const name = api.query.nft.collectionName(i)
      console.log(decode(name))
      if (i >= 5) break;
    }

    fetch('https://audius-metadata-4.figment.io/v1/users/nlGNe/tracks?app_name=EXAMPLEAPP',)
      .then(res => res.json()).then(({data}) => {
      setTracks(data)
      console.log(data);
    });
  }, [])

  return (
    <div className="container">
      <Heading color="#CC0FE0" marginBottom="2rem">Trending Music</Heading>
      {tracks?.map((track) => (<Flex
        direction={"row"}
        paddingRight="2rem"
        marginBottom={"1rem"}
        boxShadow="0px 4px 6px 3px rgba(133, 133, 133, 0.3)"
      >
        <Image src={track.artwork['150x150']} size={128} padding={'1rem'}/>
        <Flex marginTop="2rem" direction="column" width="100%">
          <Flex>
            <Text fontSize="sm" fontWeight="bold" marginRight={'2rem'} marginBottom={'2rem'}>{track.user?.handle}</Text>
            <Text fontSize="sm">{track.title}</Text>
          </Flex>
          <Flex>
            <PlayIcon/>
            <Scrubber elapsedSeconds={0} isPlaying={false} totalSeconds={track.duration} mediaKey={123}/>
          </Flex>
        </Flex>
      </Flex>))}
    </div>
  )
}

export default NFTSpace;
