import nose2
import unittest
from unittest.mock import patch, mock_open

from parse_m3u import read_file, parse_line, main


EXAMPLE = "../../example/Pop.m3u"


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

    def setUp(self):
        self.identified_lines = ["#:0,Katy Perry - Hot N Cold.mp3\n",
                                 "#:0,Marquess - El temperamento.mp3\n",
                                 "#:0,La Roux - Bulletproof.mp3\n",
                                 "#:0,Flipsyde - Trumpets.mp3\n",
                                 "#:0,T.A.T.U. - Gomenasai.mp3\n",
                                 "#:0,Christina Aguilera - Ain't No Other Man.mp3\n"]

        self.parsed_lines = [
            {"artist": "Katy Perry", "track": "Hot N Cold"},
            {"artist": "Marquess", "track": "El temperamento"},
            {"artist": "La Roux", "track": "Bulletproof"},
            {"artist": "Flipsyde", "track": "Trumpets"},
            {"artist": "T.A.T.U.", "track": "Gomenasai"},
            {"artist": "Christina Aguilera", "track": "Ain't No Other Man"}
        ]

    def test_read_file_doesnt_throw_decode_error(self):
        identified_lines = read_file(EXAMPLE)
        self.assertEqual(len(identified_lines), 137)

    @patch("builtins.open", new_callable=mock_open, read_data=popm3u)
    def test_mock_read_file_returns_correct_number_of_rows(self, mock_open):
        identified_lines = read_file(EXAMPLE)
        self.assertEqual(len(identified_lines), 6)

    @patch("builtins.open", new_callable=mock_open, read_data=popm3u)
    def test_mock_read_file_returns_0_rows_with_wrong_identifier(self, mock_open):
        identified_lines = read_file(EXAMPLE, line_identifier="foobar")
        self.assertEqual(len(identified_lines), 0)

    def test_parse_single_line(self):
        line = "#EXTINF:0,Katy Perry - Hot N Cold.mp3"
        result = parse_line(line)
        self.assertEqual(result, {"artist": "Katy Perry", "track": "Hot N Cold"})

    def test_parse_single_line_with_multiple_dashes_in_song(self):
        line = "#EXTINF:0,The Flames - Everytime (Afri-Cola).mp3"
        result = parse_line(line)
        self.assertEqual(result, {"artist": "The Flames", "track": "Everytime (Afri-Cola)"})

    def test_parse_single_line_with_multiple_dashes_in_artist(self):
        line = "#EXTINF:0,O-Zone - dragostea din tei.mp3"
        result = parse_line(line)
        self.assertEqual(result, {"artist": "O-Zone", "track": "dragostea din tei"})

    def test_parse_single_line_with_camelcase_suffix(self):
        line = "#EXTINF:0,Joshua Kadison  - Picture postcards from L.A. .Mp3"
        result = parse_line(line)
        self.assertEqual(result, {"artist": "Joshua Kadison", "track": "Picture postcards from L.A."})

    # TODO possibly be smarter in parsing?
    # e.g. if there is no spaces but only one minus, the split at the minus and replace underscores with spaces
    def test_parse_single_non_conform_line_returns_non_conform_output_for_now(self):
        line = "EXTINF:0,03-adam_green-jessica-rns.mp3"
        result = parse_line(line)
        self.assertEqual(result, {"artist": "unknown", "track": "unknown", "raw": line})

    def test_parse_some_lines_in_popm3u(self):
        for i, l in enumerate(self.identified_lines):
            result = parse_line(l)
            self.assertEqual(result, self.parsed_lines[i])

    def test_parse_popm3u_returns_3_unknowns(self):
        result = read_file(EXAMPLE)
        unknowns = [r for r in result if "raw" in r.keys()]
        self.assertEqual(len(unknowns), 3)

    def test_whole_application_runs_without_error(self):
        main(EXAMPLE)


if __name__ == "__main__":
    nose2.main()
