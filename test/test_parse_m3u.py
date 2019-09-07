import nose2
import unittest
from parse_m3u import read_file


class TestParser(unittest.TestCase):

    def test_read_file_returns_correct_number_of_rows(self):
        identified_lines = read_file("./example/Pop.m3u")
        self.assertEqual(len(identified_lines), 137)

    def test_read_file_returns_0_rows_with_wrong_identifier(self):
        identified_lines = read_file("./example/Pop.m3u", line_identifier="foobar")
        self.assertEqual(len(identified_lines), 0)

if __name__ == "__main__":
    nose2.main()
