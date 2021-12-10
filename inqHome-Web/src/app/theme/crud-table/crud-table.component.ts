import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServiceError } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
})
export class CrudTableComponent<T> implements OnInit, OnChanges {

  @Input() pageSize = 10;

  @Input() resourceSingular: string;
  @Input() resourcePlural: string;

  @Input() showHeader = true;

  @Input() showSearch = true;
  @Input() searchInputPlaceholder = '';

  @Input() showActions = true;

  @Input() fields: any[];
  @Input() items: Observable<T[]> | T[];

  @Input() showEditBtn = true;
  @Input() editBtnText: string | null = null;
  @Input() editBtnType = 'default';
  @Input() showEditBtnIcon = true;

  @Input() showDeleteBtn = true;
  @Input() deleteBtnText: string | null = null;
  @Input() deleteBtnType = 'default';
  @Input() showDeleteBtnIcon = true;

  @Input() showViewBtn = false;
  @Input() viewBtnText: string | null = null;
  @Input() viewBtnType = 'default';
  @Input() showViewBtnIcon = true;

  @Input() deleteFn: (record: T) => Observable<T>;
  @Input() formatItemFn: (record: T) => string;
  @Input() filtersContent: TemplateRef<void>;
  @Input() extraActions: TemplateRef<void>;

  @Output() list = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() searchChange = new EventEmitter();

  _items: T[] = [];

  loading = false;

  private _search: string;
  get search() {
    return this._search;
  }
  set search(value) {
    this.searchChange.emit(value);
    this._search = value;
  }

  @Input() hideEditFn: (record: T) => boolean = (_record) => false;
  @Input() hideDeleteFn: (record: T) => boolean = (_record) => false;
  @Input() hideViewFn: (record: T) => boolean = (_record) => false;

  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.handleItemsChange(changes.items);
    }
  }

  handleItemsChange(itemsChange: SimpleChange) {
    const currentValue = itemsChange.currentValue;

    if (currentValue == null) {
      this._items = [];
      return;
    }

    if (Array.isArray(currentValue)) {
      this._items = currentValue;
      return;
    }

    this.loading = true;
    currentValue
      .subscribe(
        (items: any[]) => {
          this.loading = false;
          this._items = items;
        },
        (e: ServiceError) => {
          this.loading = false;
          this.message.error(e.message);
        }
    );
  }

  emitList() {
    this.list.emit({ search: this.search });
  }

  emitEdit(item: T) {
    this.edit.emit(item);
  }

  emitView(item: T) {
    this.view.emit(item);
  }

  delete(item: T) {
    this.modal.confirm({
      nzTitle: 'Remover registro',
      nzContent: `
        <strong>Atenção</strong>: Tem certeza que deseja excluir o item: ${this.formatItemFn(item)}?
        <br> <strong>Essa ação não pode ser desfeita.</strong>
        `,
      nzOnOk: () => this.doDelete(item),
      nzOkText: 'Confirmar',
    });
  }

  doDelete(item: T) {
    return this.deleteFn(item)
      .toPromise()
      .then(() => {
        this.message.success('Registro removido com sucesso');
        this.emitList();
      })
      .catch((e: ServiceError) => {
        this.message.error(e.message);
      });
  }

  shouldShowEdit(data: T): boolean {
    const hideOnRow = this.hideEditFn(data);

    if (hideOnRow) {
      return false;
    }

    return this.showEditBtn;
  }

  shouldShowDelete(data: T): boolean {
    const hideOnRow = this.hideDeleteFn(data);

    if (hideOnRow) {
      return false;
    }

    return this.showDeleteBtn;
  }

  shouldShowView(data: T): boolean {
    const hideOnRow = this.hideViewFn(data);

    if (hideOnRow) {
      return false;
    }

    return this.showViewBtn;
  }
}
