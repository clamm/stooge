import nose2
import unittest
from unittest.mock import patch, mock_open

from parse_m3u import read_file, main


class TestParser(unittest.TestCase):
    popm3u = """
#EXTM3U
#EXTINF:0,Katy Perry - Hot N Cold.mp3
..\Pop\Katy Perry - One of the boys\Katy Perry - Hot N Cold.mp3

#EXTINF:0,Marquess - El temperamento.mp3
..\Pop\Marquess\Marquess - El temperamento.mp3

#EXTINF:0,La Roux - Bulletproof.mp3
..\Pop\La Roux - Bulletproof.mp3

#EXTINF:0,Flipsyde - Trumpets.mp3
..\Pop\Flipsyde\Flipsyde - Trumpets.mp3

#EXTINF:0,T.A.T.U. - Gomenasai.mp3
..\Pop\T.A.T.U\T.A.T.U. - Gomenasai.mp3

#EXTINF:0,Christina Aguilera - Ain't No Other Man.mp3
..\Pop\Christina Aguilera\Christina Aguilera - Ain't No Other Man.mp3
"""

    def test_read_file_doesnt_throw_decode_error(self):
        identified_lines = read_file("./example/Pop.m3u")
        self.assertEqual(len(identified_lines), 137)

    @patch("builtins.open", new_callable=mock_open, read_data=popm3u)
    def test_mock_read_file_returns_correct_number_of_rows(self, mock_open):
        identified_lines = read_file("./example/Pop.m3u")
        self.assertEqual(len(identified_lines), 6)

    @patch("builtins.open", new_callable=mock_open, read_data=popm3u)
    def test_mock_read_file_returns_0_rows_with_wrong_identifier(self, mock_open):
        identified_lines = read_file("./example/Pop.m3u", line_identifier="foobar")
        self.assertEqual(len(identified_lines), 0)

    def test_whole_application_runs_without_error(self):
        main("./example/Pop.m3u")


if __name__ == "__main__":
    nose2.main()
