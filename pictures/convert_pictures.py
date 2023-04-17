import cv2
import numpy as np
import os
import sys
import json
import shutil


def check_path(path):
    if not os.path.exists(path):
        os.mkdir(path)


class PicturesPreprocess:
    def __init__(self):
        self._data_path = 'origin'
        self._save_path = 'show'
        self._img_base_dir = 'pictures'
        self._small_size = 300
        self._large_size = 1800

        if os.path.exists(self._save_path):
            shutil.rmtree(self._save_path)
        check_path(self._save_path)
        self.process_data()
        return 

    def process_data(self):
        if not os.path.exists(self._data_path):
            print('Error, invalid input source data path : ', self._data_path)
            return
        image_json = []
        clique_item = os.listdir(self._data_path)
        for item in clique_item:
            item_save_path = os.path.join(self._save_path, item)
            item_save_small_path = os.path.join(item_save_path, 'small')
            item_save_large_path = os.path.join(item_save_path, 'large')
            check_path(item_save_path)
            check_path(item_save_small_path)
            check_path(item_save_large_path)

            item_path = os.path.join(self._data_path, item)
            print('Processing ', item_path, ', which contains ', len(os.listdir(item_path)), ' files')
            for file_name in os.listdir(item_path):
                if not file_name.endswith(('.jpg', '.png')):
                    continue
                file_path = os.path.join(item_path, file_name)
                img = cv2.imread(file_path)
                if len(img) == 0:
                    continue
                small_img, large_img = self.convert_image(img)
                small_path = os.path.join(item_save_small_path, file_name) 
                large_path = os.path.join(item_save_large_path, file_name) 
                cv2.imwrite(small_path, small_img)
                cv2.imwrite(large_path, large_img)
                img_info = {}
                img_info['file_name'] = file_name
                img_info['group'] = item
                img_info['desc'] = ''
                img_info['small'] = os.path.join(self._img_base_dir, small_path).replace('\\', '/')
                img_info['large'] = os.path.join(self._img_base_dir, large_path).replace('\\', '/')
                img_info['small_width'] = small_img.shape[1]
                img_info['small_height'] = small_img.shape[0]
                img_info['large_width'] = large_img.shape[1]
                img_info['large_height'] = large_img.shape[0]
                image_json.append(img_info)

        image_json = list(sorted(image_json, key=lambda x: x['group']))
        with open('image_json.js', 'w', encoding='utf-8') as w:
            w.write('var image_json = ')
            json.dump(image_json, w, indent=4)

    def get_small_shape(self, shape):
        width = shape[1]
        height = shape[0]
        if width > height:
            new_width = self._small_size
            height = new_width * (height / width)
            return (int(new_width), int(height))
        else:
            new_height = self._small_size
            width = new_height * (width / height)
            return (int(width), int(new_height))

    def get_large_shape(self, shape):
        width = shape[1]
        height = shape[0]

        if width > height:
            new_width = self._large_size
            height = new_width * (height / width)
            return (int(new_width), int(height))
        else:
            new_height = self._large_size
            width = new_height * (width / height)
            return (int(width), int(new_height))

    def convert_image(self, img):
        shape = img.shape
        small_shape = self.get_small_shape(shape)
        small_img = cv2.resize(img, small_shape)
        large_shape = self.get_large_shape(shape)
        large_img = cv2.resize(img, large_shape)
        return small_img, large_img


if __name__ == '__main__':
    current_path = os.path.abspath(__file__)
    base_path = os.path.dirname(current_path)
    if len(sys.argv) == 2:
        base_path = sys.argv[1]
    print('work path : ', base_path)
    os.chdir(base_path)
    ci = PicturesPreprocess()
