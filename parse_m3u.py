import sys


def read_file(file_name):
    """
    read file and get relevant lines

    Example file:

        #EXTM3U
        #EXTINF:0,Katy Perry - Hot N Cold.mp3
        ..\Pop\Katy Perry - One of the boys\Katy Perry - Hot N Cold.mp3

        #EXTINF:0,Marquess - El temperamento.mp3
        ..\Pop\Marquess\Marquess - El temperamento.mp3

    --> relevant lines are the ones with "EXTINF"
    """
    with open(file_name, "r", encoding="cp1252") as f:
        lines = f.readlines()
        i = 0
        for line in lines:
            i = i + 1
            if "EXTINF" in line:
                print(line)
        print(i)


def main(file_name):
    # read file and get relevant lines
    read_file(file_name)
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
