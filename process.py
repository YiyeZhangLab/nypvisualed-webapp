import json
from bs4 import BeautifulSoup


def addLinknumToLinks(f):
    with open(f) as json_file:
        data = json.load(json_file)

    links = data["links"]
    counter = {}
    for l in links:
        s = frozenset([l['source'], l['target']])
        counter[s] = counter.get(s, 0)+1
    for l in links:
        s = frozenset([l['source'], l['target']])
        l['linknum'] = counter.get(s, 0)

    print(links)
    # index = 0
    # for n in data["res"]["nodes"]:
    #     n['id'] = index
    #     index += 1

    # print(data)

    # with open('network_data.json', 'w') as outfile:
    #     json.dump(data, outfile)


def addIndexToNode():
    with open("network_data.json") as json_file:
        data = json.load(json_file)

    index = 0
    for n in data["res"]["nodes"]:
        n['id'] = index
        index += 1

    print(data)

    with open('network_data.json', 'w') as outfile:
        json.dump(data, outfile)


def parseHTMLNodePosition(html_doc):
    soup = BeautifulSoup(html_doc, 'html.parser')
    t = soup.find_all('text')
    nodesPositionList = {}
    for m in t:
        nodePosition = {}
        if m.string:
            nodePosition['name'] = m.string
        else:
            nodePosition['name'] = "NONAME"
        nodePosition['x'] = m['dx']
        nodePosition['y'] = m['dy']
        nodesPositionList[nodePosition['name']] = (nodePosition)

    return nodesPositionList


def main():
    addLinknumToLinks("hospital_nodes_position.json")
    # with open('temp.html') as html_doc:
    #     positionList = parseHTMLNodePosition(html_doc)
    # with open('hospital_nodes_position.json', 'w') as outfile:
    #     json.dump({"positions": positionList}, outfile)


if __name__ == "__main__":
    main()
