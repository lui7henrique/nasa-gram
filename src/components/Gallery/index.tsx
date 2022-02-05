import {
  Grid,
  GridItem,
  Image as ChakraImage,
  AspectRatio,
  useDisclosure,
  Box,
  Heading
} from "@chakra-ui/react"
import { ModalViewImage } from "components/Modal/ViewMedia"
import { format } from "date-fns"
import { Media } from "templates/Home/types"

import { MobileGalleryItemInfos } from "./MobileGalleryItemInfos"

type GalleryItemProps = {
  children: React.ReactNode
  item: Media
}

const GalleryItem = ({ children, item }: GalleryItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <GridItem
      rowSpan={1}
      colSpan={1}
      cursor="pointer"
      onClick={onOpen}
      position="relative"
      overflow="hidden"
      _hover={{
        "div.date": {
          transform: "translateX(0%) !important"
        }
      }}
      zIndex={5}
    >
      <Box
        transform="translateX(-150%)"
        className="date"
        position="absolute"
        bottom={4}
        left={4}
        zIndex={10}
        transition="all 0.4s ease-in-out"
        filter="brightness(1.8)"
        display={{ base: "none", lg: "block" }}
      >
        <Heading as="h4" fontSize={50} fontWeight={300}>
          {format(new Date(item.date), "dd")}
        </Heading>
        <Heading as="h4" fontSize={20} fontWeight={300}>
          {format(new Date(item.date), "MMMM")},{" "}
          {format(new Date(item.date), "yyyy")}
        </Heading>
      </Box>
      <AspectRatio
        ratio={1}
        transition="all 0.2s ease-in-out"
        filter="brightness(0.8)"
        _hover={{
          filter: "brightness(0.3)"
        }}
      >
        {children}
      </AspectRatio>
      <Box display={{ base: "block", lg: "none" }}>
        <MobileGalleryItemInfos item={item} />
      </Box>
      <ModalViewImage isOpen={isOpen} onClose={onClose} media={item} />
    </GridItem>
  )
}

type GalleryProps = {
  media: Media[]
}

export const Gallery = ({ media }: GalleryProps) => {
  return (
    <Grid
      as="section"
      templateRows={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)"
      }}
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)"
      }}
      gap={{ base: 4, lg: 4 }}
    >
      {media.length &&
        media.map((item) => (
          <>
            <GalleryItem key={item.date} item={item}>
              {item.media_type === "image" ? (
                <ChakraImage
                  key={JSON.stringify(item)}
                  src={item.url}
                  alt={item.title}
                  w="full"
                  h="full"
                  objectFit="cover"
                  borderRadius={{ base: 0, lg: "5px" }}
                />
              ) : (
                <iframe
                  src={item.url}
                  title={item.title}
                  style={{
                    borderRadius: "5px",
                    zIndex: 5,
                    pointerEvents: "none"
                  }}
                  allowFullScreen
                />
              )}
            </GalleryItem>
          </>
        ))}
    </Grid>
  )
}
