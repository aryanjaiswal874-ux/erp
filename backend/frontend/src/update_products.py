import json
import os

file_path = r'd:\Current Projects\SBGM\updated\src\Data\Products.json'

image_urls = [
    "https://sbgmdigital.com/wp-content/uploads/2026/01/101.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/102.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/103.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/104.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/105.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/106.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/107.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/108.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/109.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/110.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/111.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/112.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/113.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/114.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/115.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/116.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/117.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/118.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/119.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/120.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/121.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/122.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/123.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/124.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/125.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/126.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/127.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/128.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/129.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/130.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/131.png",
    "https://sbgmdigital.com/wp-content/uploads/2026/01/132.png"
]

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for i, product in enumerate(data):
        img_url = image_urls[i % len(image_urls)]
        product['Image'] = img_url

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully updated product images.")

except Exception as e:
    print(f"Error: {e}")
