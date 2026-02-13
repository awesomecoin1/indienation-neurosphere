import os

html_path = "public/index.html"
if os.path.exists(html_path):
    with open(html_path, "r") as f:
        content = f.read()
    
    # Menambahkan filter CSS untuk mengaburkan QR dari bot scanner luar
    masking_style = """
    <style>
        .qr-mask { filter: contrast(150%) brightness(120%) hue-rotate(90deg); transition: 0.3s; }
        .qr-mask:hover { filter: none; }
    </style>
    """
    
    if "</head>" in content:
        content = content.replace("</head>", masking_style + "</head>")
        # Menerapkan class qr-mask pada elemen QR
        content = content.replace('class="mx-auto', 'class="qr-mask mx-auto')
        
    with open(html_path, "w") as f:
        f.write(content)
    print("✅ Identity Masking Applied via Auralang.")
