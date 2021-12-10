import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  MenuOutline,
  ShoppingCartOutline,
  PlusCircleOutline,
  MinusCircleOutline,
  FolderViewOutline,
  ControlOutline,
  FilterOutline,
  EyeOutline,
  CheckOutline,
  TrophyOutline,
  TrophyTwoTone,
  DownloadOutline,
  FileTwoTone,
  ArrowDownOutline,
  BarcodeOutline,
  PrinterOutline,
  GiftOutline,
  DollarCircleOutline,
  CalendarOutline,
  PercentageOutline,
  SettingOutline,
  ShopOutline,
  SwapRightOutline,
  ShoppingOutline,
  LikeOutline,
  TeamOutline,
  UserAddOutline,
  ArrowRightOutline,
  ContactsOutline,
  HomeOutline,
  ProfileOutline

} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  MenuOutline,
  ShoppingCartOutline,
  PlusCircleOutline,
  MinusCircleOutline,
  FolderViewOutline,
  ControlOutline,
  FilterOutline,
  EyeOutline,
  CheckOutline,
  TrophyOutline,
  TrophyTwoTone,
  DownloadOutline,
  FileTwoTone,
  ArrowDownOutline,
  BarcodeOutline,
  PrinterOutline,
  GiftOutline,
  DollarCircleOutline,
  CalendarOutline,
  PercentageOutline,
  ShopOutline,
  SwapRightOutline,
  SettingOutline,
  ShoppingOutline,
  LikeOutline,
  TeamOutline,
  UserAddOutline,
  ArrowRightOutline,
  ContactsOutline,
  HomeOutline,
  ProfileOutline
  
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
