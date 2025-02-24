import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  templateUrl: './setting.component.html',
})
export class SettingComponent {
  //skeleton
  isLoading = true;
  showContent = false;
  selectedTab: string = 'editProfile'; // Set the default selected tab
  tabTitle: string = 'Edit Profil';
  subTitle: string = 'Set Up Your Personal Information';
  listItemClass: string =
    'flex items-center mb-3 px-5 py-3 rounded-[6px] bg-transparent text-light dark:text-white/60 font-normal [&.active]:text-primary [&.active]:bg-primary/10 duration-300 gap-[12px] cursor-pointer';

  // Function to handle tab selection
  selectTab(tab: string, title: string, subtitle: string) {
    this.selectedTab = tab;
    this.tabTitle = title;
    this.subTitle = subtitle;
  }

  changePWForm: FormGroup;
  avatarUrl: string = 'assets/images/avatars/thumbs.png';
  avatarCoverUrl: string = 'assets/images/profile-cover.png';
  selectedCountry: any;
  selectedLanguage: any;

  networkList = [
    {
      name: 'Facebook',
      icon: 'facebook',
      avatarColor: '#4267b1',
      avatarBg: 'rgba(66, 103, 177, 0.1)',
      status: true,
      link: 'https://facebook.com',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      avatarColor: '#fff',
      avatarBg:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
      status: false,
      link: 'https://instagram.com',
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      avatarColor: '#1ca1f2',
      avatarBg: 'rgba(28, 161, 242, 0.1)',
      status: true,
      link: 'https://twitter.com',
    },
    {
      name: 'Dribbble',
      icon: 'dribbble',
      avatarColor: '#d8487e',
      avatarBg: 'rgba(216, 72, 126, 0.1)',
      status: false,
      link: 'https://dribbble.com',
    },
    {
      name: 'Github',
      icon: 'github',
      avatarColor: '#323131',
      avatarBg: 'rgba(50, 49, 49, 0.1)',
      status: true,
      link: 'https://github.com',
    },
    {
      name: 'Linkedin',
      icon: 'linkedin',
      avatarColor: '#0174af',
      avatarBg: 'rgba(1, 116, 175, 0.1)',
      status: true,
      link: 'https://linkedin.com',
    },
    {
      name: 'Dropbox',
      icon: 'dropbox',
      avatarColor: '#005ef7',
      avatarBg: 'rgba(0, 94, 247, 0.1)',
      status: false,
      link: 'https://dropbox.com',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    // Simulate loading time
    this.loadData();

    // form
    this.changePWForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    // Get the avatar and avatar cover from localStorage
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      this.avatarUrl = storedAvatar;
    }
    // Get the avatar and avatar cover from localStorage
    const storedAvatarCover = localStorage.getItem('avatarCover');
    if (storedAvatarCover) {
      this.avatarCoverUrl = storedAvatarCover;
    }
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you want to change your password?</i>',
      nzOnOk: () => this.message.success('Password Change Successfully'),
    });
  }

  submitForm(): void {
    for (const i in this.changePWForm.controls) {
      this.changePWForm.controls[i].markAsDirty();
      this.changePWForm.controls[i].updateValueAndValidity();
    }

    this.showConfirm();
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  //avatar
  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarUrl = img;
      localStorage.setItem('avatar', img); // Store the avatar in localStorage
    });
  }
  //cover
  handleCoverChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarCoverUrl = img;
      localStorage.setItem('avatarCover', img); // Store the avatar cover in localStorage
    });
  }
}
