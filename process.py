import json


with open("network_data.json") as json_file:
    data = json.load(json_file)

index = 0
for n in data["res"]["nodes"]:
    n['id'] = index
    index += 1

print(data)

with open('network_data.json', 'w') as outfile:
    json.dump(data, outfile)
