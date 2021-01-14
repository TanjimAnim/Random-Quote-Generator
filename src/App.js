import React from "react";
import "./styles.css";

import { useState, useCallback } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Icon,
  Flex,
  HStack,
  Heading,
  Link,
  color
} from "@chakra-ui/react";

import { FaTwitter, FaQuoteLeft } from "react-icons/fa";
import quoteArray from "../public/quotes";
import { defaultColor, getRandomColor } from "../public/color";

const QuoteBox = () => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [color, setColor] = useState(defaultColor);

  const onQuoteChange = useCallback(async () => {
    const nextColor = getRandomColor();
    setLoading(true);
    const randomQuote =
      quoteArray[Math.floor(Math.random() * quoteArray.length)];
    setTimeout(() => {
      setLoading(false);
      setColor(nextColor);
      setQuote(randomQuote);
    }, 500);
  }, []);

  React.useEffect(() => {
    onQuoteChange();
  }, [onQuoteChange]);

  var randomTweet = (quote) => {
    if (!quote) {
      return null;
    }

    const link = `https://twitter.com/intent/tweet?text="${quote.quote}"%20-${quote.author}`;
    return link;
  };

  return (
    <Box
      bg={color}
      h="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
    >
      <Box
        width="60%"
        border="1px"
        boxShadow="md"
        p={5}
        rounded="md"
        bg="white"
        borderColor="gray.400"
        mx="auto"
      >
        <Box>
          <Flex>
            <Box>
              <Icon as={FaQuoteLeft} w={7} h={6} color={color} />
              <Text fontSize="2xl" color={color} pl={8} mt="-20px">
                {loading || !quote ? "..." : quote.quote}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="xl" align="right" color={color}>
            -{loading || !quote ? "..." : quote.author}
          </Text>
        </Box>

        <HStack mt="2%" ml="1%" spacing="2%">
          <Button color={color} size="sm" onClick={onQuoteChange}>
            New Quote
          </Button>

          <Button
            as={Link}
            color={color}
            size="sm"
            leftIcon={<FaTwitter />}
            target="_blank"
            href={randomTweet(quote)}
          >
            Twitter
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider>
      <QuoteBox />
    </ChakraProvider>
  );
}

export default App;
