import sys


def read_file(file_name, line_identifier="EXTINF"):
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
                result.append(line)
        return result


def main(file_name):
    # read file and get relevant lines
    result = read_file(file_name)
    print(result)
    # parse lines into song / artist information
    # possibly write out unknowns to shazam later
    # make query out of song / artist information
    # fire search query against spotify API https://developer.spotify.com/documentation/web-api/reference/search/search/
    # figure out authentication and authorization of spotify API https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
    # parse search result
    # put search result into playlist via spotify API https://developer.spotify.com/documentation/web-api/reference/playlists/


if __name__ == "__main__":
    file_name = sys.argv[1]
    main(file_name)
