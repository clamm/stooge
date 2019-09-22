import json
import re
import sys


def read_file(file_name, line_identifier="#EXTINF:"):
    """
    read file and get relevant lines

    Example file:

        #EXTM3U
        #EXTINF:0,Katy Perry - Hot N Cold.mp3
        ..\Pop\Katy Perry - One of the boys\Katy Perry - Hot N Cold.mp3

        #EXTINF:0,Marquess - El temperamento.mp3
        ..\Pop\Marquess\Marquess - El temperamento.mp3

    --> relevant lines are the ones with "EXTINF" or otherwise configured
    """
    with open(file_name, "r", encoding="cp1252") as f:
        lines = f.readlines()
        i = 0
        result = []
        for line in lines:
            if line_identifier in line:
                i = i + 1
                result.append(parse_line(line.replace(line_identifier, "")))
        return result


def parse_line(line):
    result = {}
    line_without_suffix = re.sub("\.mp3$", "", line.rstrip(), flags=re.IGNORECASE)
    line_without_prefix = line_without_suffix.split(",")[1]
    dash_splits = re.split("\s-\s", line_without_prefix)
    if len(dash_splits) > 1:
        result["artist"] = dash_splits[0].strip()
        result["track"] = dash_splits[1].strip()
    else:
        result["artist"] = "unknown"
        result["track"] = "unknown"
        result["raw"] = line
    return result


def main(file_name):
    # read file and get relevant lines
    result = read_file(file_name)
    with open("../../example/pop.json", "w") as f:
        json.dump(result, f, indent=4, sort_keys=True)
    # parse lines into song / artist information
    # possibly write out unknowns to shazam later
    # make query out of song / artist information
    # fire search query against search spotify API
    # parse search result
    # put search result into playlist via playlist spotify API


if __name__ == "__main__":
    file_name = sys.argv[1]
    main(file_name)
