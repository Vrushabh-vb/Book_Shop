import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Text, Searchbar } from 'react-native-paper';
import axios from 'axios';

export default function Books({ navigation, route }) {
  const { userId } = route.params;
  console.log(userId);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://192.168.137.1:4444/book/all');
      const bookData = response.data.data;
      setBooks(bookData);
      setFilteredBooks(bookData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [userId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleBookClick = (book) => {
    navigation.navigate('BookDetails',{book,userId});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={{ marginRight: 20, color: 'blue', fontSize: 16 }}
          onPress={() => navigation.navigate('MyOrders', { userId })}
        >
          My Orders
        </Text>
      ),
    });
  }, [navigation, userId]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Searchbar
        placeholder="Search books"
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ marginBottom: 20 }}
      />
      {filteredBooks.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No books found</Text>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.book_id.toString()}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }} onPress={() => handleBookClick(item)}>
              <Card.Content>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.author}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Price: {item.price}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}
