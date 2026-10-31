import os
import zipfile
import sys

def make_zip(source_dir, output_zip_path):
    exclude_dirs = {'node_modules', 'dist', '.git', '.aistudio', '__pycache__'}
    exclude_extensions = {'.bin'}
    exclude_files = {'farmbridge-ai.zip'}

    print(f"Creating zip file from {source_dir} -> {output_zip_path}...")
    
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if file in exclude_files:
                    continue
                ext = os.path.splitext(file)[1].lower()
                if ext in exclude_extensions:
                    continue

                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                
                # Skip any zip files or files in excluded directories
                if any(excluded in rel_path.split(os.sep) for excluded in exclude_dirs):
                    continue

                print(f"  Adding: {rel_path}")
                zipf.write(full_path, rel_path)

    size_mb = os.path.getsize(output_zip_path) / (1024 * 1024)
    print(f"Zip created successfully: {output_zip_path} ({size_mb:.2f} MB)")

if __name__ == '__main__':
    src = '/app/applet'
    # Save both in root and in public for direct download link
    pub_zip = '/app/applet/public/farmbridge-ai.zip'
    root_zip = '/app/applet/farmbridge-ai.zip'
    make_zip(src, pub_zip)
    import shutil
    shutil.copy2(pub_zip, root_zip)
    print("Copied zip to root folder as well.")
