import { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, useColorMode, useColorModeValue, VStack, IconButton, Textarea, useToast } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleAddNote = () => {
    if (!inputTitle || !inputContent) {
      toast({
        title: "Error",
        description: "Both title and content are required to add a note.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: inputTitle,
      content: inputContent,
    };
    setNotes([newNote, ...notes]);
    setInputTitle("");
    setInputContent("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading mb={4}>Notes</Heading>
        <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound={true} size="lg" alignSelf="flex-end" onClick={toggleColorMode} aria-label="Toggle color mode" />
      </Flex>
      <Box mb={4}>
        <Input placeholder="Title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} mb={2} />
        <Textarea placeholder="Take a note..." value={inputContent} onChange={(e) => setInputContent(e.target.value)} mb={2} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
      <VStack spacing={4}>
        {notes.map((note) => (
          <Flex key={note.id} p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" width="full" bg={useColorModeValue("gray.100", "gray.700")} alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontWeight="bold">{note.title}</Text>
              <Text mt={2}>{note.content}</Text>
            </Box>
            <IconButton icon={<FaTrash />} isRound={true} onClick={() => handleDeleteNote(note.id)} aria-label="Delete note" />
          </Flex>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
